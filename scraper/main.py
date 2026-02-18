import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import os
import traceback

# Configuration
NICHE = "Med Spas"
CITY = "Tampa, FL"
SEARCH_TERM = f"{NICHE} in {CITY}"
HEADLESS = False

def init_driver():
    print("🚗 Initializing Chrome Driver...")
    options = webdriver.ChromeOptions()
    
    # Enable maximization (sometimes full screen works better)
    options.add_argument("--start-maximized")
    
    # Standard stability flags - reduce crash risk
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--log-level=3") # Reduce noise
    
    # Removed aggressive anti-detection flags that might cause crashes on some setups
    # options.add_argument("--disable-blink-features=AutomationControlled")
    # options.add_experimental_option("excludeSwitches", ["enable-automation"])
    
    try:
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)
        print("✅ Driver initialized successfully.")
        return driver
    except Exception as e:
        print(f"❌ Failed to initialize driver: {e}")
        traceback.print_exc()
        raise e

def scrape_google_maps():
    driver = None
    leads = []
    
    try:
        driver = init_driver()
        
        print(f"🌍 Navigating to Google Maps...")
        driver.get("https://www.google.com/maps")
        print("✅ Navigation successful.")

        # --- Consent Form Handling ---
        try:
            # Check for generic 'Accept all' or 'Agree' buttons if redirected to consent page
            consent_buttons = driver.find_elements(By.XPATH, "//button[contains(., 'Accept all')] | //button[contains(., 'Agree')] | //span[contains(., 'Accept all')]")
            if consent_buttons:
                print("🍪 Removing Cookie Consent Popup...")
                consent_buttons[0].click()
                time.sleep(2)
        except:
            pass
        # -----------------------------
        
        # Check for Language Redirect
        if "consent.google.com" in driver.current_url:
            print("⚠️ Redirected to Google Consent Page. Attempting to pass...")
            # If still stuck, user might need to click manually
            time.sleep(5)
        
        # Wait for search box with explicit wait
        print("⏳ Waiting for search box...")
        wait = WebDriverWait(driver, 20)
        
        try:
            search_box = wait.until(EC.presence_of_element_located((By.ID, "searchboxinput")))
        except:
            print("⚠️ Could not find search box by ID. Trying by name...")
            search_box = driver.find_element(By.NAME, "q")

        print("✅ Search box found.")
        
        search_box.clear()
        search_box.send_keys(SEARCH_TERM)
        search_box.send_keys(Keys.ENTER)
        print(f"🔍 Searching for: {SEARCH_TERM}")
        
        time.sleep(5) # Allow results to load

        # Scroll logic to load more results
        # We try to find the feed container
        scrollable_div = None
        
        # Strategy 1: feed role
        try:
            scrollable_div = driver.find_element(By.CSS_SELECTOR, "div[role='feed']")
            print("📜 Feed container found (role='feed'). Scrolling...")
        except:
            pass
            
        # Strategy 2: Arial label 'Results for...'
        if not scrollable_div:
            try:
                scrollable_div = driver.find_element(By.XPATH, f"//div[contains(@aria-label, 'Results for {SEARCH_TERM}')]")
                print("📜 Feed container found (aria-label). Scrolling...")
            except:
                pass

        if scrollable_div:
            for _ in range(5): 
                driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", scrollable_div)
                time.sleep(2)
        else:
             print("⚠️ Could not verify scrollable container. Results might be limited.")
            
        # Extract Listings
        print("📊 Extracting listings...")
        items = driver.find_elements(By.CSS_SELECTOR, "div[role='article']")
        
        if not items:
             # Try fallback selector (sometimes class names change)
             items = driver.find_elements(By.CLASS_NAME, "hfpxzc") # Common class for results
        
        print(f"Found {len(items)} potential leads.")
        
        for item in items:
            try:
                aria_label = item.get_attribute("aria-label")
                if not aria_label: continue 
                
                name = aria_label
                
                # Extract text content
                text_content = item.text.split('\n')
                
                # Check for website link
                website = "N/A"
                try:
                    # Look for website button/link
                    links = item.find_elements(By.TAG_NAME, "a")
                    for link in links:
                        href = link.get_attribute("href")
                        if href and ("google.com" not in href) and ("http" in href):
                            website = href
                            break
                            
                    # Backup check for specific attribute
                    if website == "N/A":
                        website_btn = item.find_element(By.CSS_SELECTOR, "a[data-value='Website']")
                        website = website_btn.get_attribute("href")
                except:
                    pass

                leads.append({
                    "Business Name": name,
                    "Search Term": SEARCH_TERM,
                    "Website": website,
                    "Raw Text": " | ".join(text_content)
                })
                
            except Exception as e:
                # print(f"⚠️ Error parsing item: {e}") 
                continue
                
    except Exception as e:
        print(f"❌ Critical Error in Scrape Logic: {e}")
        # Save Screenshot for Debugging
        if driver:
            driver.save_screenshot("debug_error.png")
            print("📸 Saved screenshot to debug_error.png")
        traceback.print_exc()
        
    finally:
        if driver:
            print("🛑 Closing driver...")
            try:
                driver.quit()
            except:
                pass
        
    return leads

def save_data(leads):
    if not leads:
        print("⚠️ No leads found.")
        return
        
    if not os.path.exists("data"):
        os.makedirs("data")
        
    # Clean filename
    city_clean = CITY.replace(', ', '_').replace(' ', '_')
    niche_clean = NICHE.replace(' ', '_')
    filename = f"data/leads_{city_clean}_{niche_clean}.csv"
    
    df = pd.DataFrame(leads)
    df.to_csv(filename, index=False)
    print(f"✅ Saved {len(leads)} leads to {filename}")

if __name__ == "__main__":
    try:
        data = scrape_google_maps()
        save_data(data)
    except Exception as e:
        print(f"Fatal error in main: {e}")
        traceback.print_exc()
