import pandas as pd
import re
import os

# Configuration
# Dynamic filename detection could be better, but we know the file name from previous step
INPUT_FILE = "data/leads_Tampa_FL_Med_Spas.csv"
OUTPUT_FILE = "data/qualified_leads_Tampa_FL.csv"

def extract_rating_reviews(raw_text):
    # Matches patterns like "4.8(94)" or "5.0(12)" within the raw text string
    # Raw text example: "Opulent Med Spa | 4.8(94) | Medical spa..."
    if pd.isna(raw_text):
        return 0.0, 0
        
    match = re.search(r"(\d\.\d)\((\d+)\)", str(raw_text))
    if match:
        return float(match.group(1)), int(match.group(2))
    return 0.0, 0

def analyze_leads():
    input_file = INPUT_FILE
    if not os.path.exists(input_file):
        print(f"X Input file not found: {input_file}")
        # Try to find any csv in data folder if specific one fails
        files = [f for f in os.listdir("data") if f.endswith(".csv") and "qualified" not in f]
        if files:
            input_file = os.path.join("data", files[0])
            print(f"! Using alternative file: {input_file}")
        else:
            return

    print(f"> Reading {input_file}...")
    try:
        df = pd.read_csv(input_file)
    except Exception as e:
        print(f"X Error reading CSV: {e}")
        return
    
    # Extract Metrics
    ratings = []
    reviews = []
    
    print("> Parsing ratings and reviews...")
    for text in df["Raw Text"]:
        r, c = extract_rating_reviews(text)
        ratings.append(r)
        reviews.append(c)
        
    df["Rating"] = ratings
    df["Review Count"] = reviews
    
    # Categorization Logic
    tiers = []
    print("> Categorizing leads...")
    for index, row in df.iterrows():
        # Check if website is valid content (not N/A or empty)
        website = str(row["Website"]).strip()
        has_website = website.lower().startswith("http") and "google.com" not in website
        
        count = row["Review Count"]
        
        if count >= 50 and has_website:
            tiers.append("Tier 1: Prime Target (Audit)")
        elif count >= 10 and has_website:
            tiers.append("Tier 2: Growth Target")
        elif not has_website: 
            # If they have reviews but no website, they usually need one!
            if count > 5:
                tiers.append("Tier 3: Needs Website")
            else:
                tiers.append("Tier 4: Low Priority") # Too small to pay?
        else:
             tiers.append("Tier 4: Low Priority")
             
    df["Priority Tier"] = tiers
    
    # Sorting: Tier alphabetical usually works well here as 1, 2, 3...
    # But let's be explicit: Sort by Tier then by Reviews Descending
    df.sort_values(by=["Priority Tier", "Review Count"], ascending=[True, False], inplace=True)
    
    # Save
    df.to_csv(OUTPUT_FILE, index=False)
    
    # Summary Output for CLI
    print("\n" + "="*40)
    print("   LEAD OPTIMIZATION COMPLETE   ")
    print("="*40)
    print(df["Priority Tier"].value_counts().to_string())
    print("="*40)
    print(f"\n> Qualified list saved to: {OUTPUT_FILE}")
    print(f"Total Prospects: {len(df)}")

if __name__ == "__main__":
    analyze_leads()
