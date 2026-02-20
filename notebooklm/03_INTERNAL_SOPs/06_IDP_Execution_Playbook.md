# SOP 06: IDP Execution Playbook — Internal Data Architecture

**Status:** Confidential / Proprietary Methodology  
**Role:** COO & Systems Architect  
**Version:** 1.0.0

## 1. The Strategic Pitch (Sales Framework)

### Positioning for B2B Leaders

The Internal Data Architecture (IDP) service must not be sold as "data processing" or "digitization." We sell **Operational Velocity** and **Sovereignty**.

* **Talking Point 1: Operational Velocity.** "Your back-office is currently a friction point. By transforming chaotic, unstructured document flows into real-time intelligence, we are increasing the speed at which your business can make decisions and deploy capital."
* **Talking Point 2: Financial Data Sovereignty.** "Stop renting third-party tools that hold your data hostage. We build pipelines that ensure you own 100% of your historical intelligence, formatted and ready for predictive AI modeling."
* **Talking Point 3: Tactical Displacement.** We are replacing human-manual error with algorithmic certainty.

### Handling Security Objections

When clients express concern over financial data exposure, the response is non-negotiable:

* **FIPA Compliance:** "Our systems are architected to meet and exceed the **Florida Information Protection Act (FIPA)** standards for data breach notifications and encryption."
* **Isolated Environments:** "Data never leaves our secure infrastructure. We don't use 'public AI' to read your documents; we use local, sandboxed neural weights."
* **Jurisdiction:** Explicitly mention that all legal disputes are governed by **Hillsborough County, FL** jurisdiction.

---

## 2. Technical Execution Architecture

### Step 1: Secure Ingestion

* **Protocol:** AES-256 encrypted SFTP or secure Supabase Storage buckets.
* **File Handling:** Ingestion is triggered via webhook of the incoming file (PDF, CSV, Excel, Image) into a dedicated "Raw" partition.
* **Validation:** Automated checksum verification to ensure file integrity during transit.

### Step 2: Processing Engine (The Pipeline)

We utilize a hybrid approach combining low-code automation for routing and specialized AI for parsing:

1. **Orchestration (n8n):** The workflow manager monitors the "Raw" bucket. Upon entry, it routes the file to the specific extraction node.
2. **Neural OCR & Parsing:**
    * Unstructured data (e.g., blurry bank statements) is processed via specialized OCR models (e.g., DocTR or custom vision transformers).
    * The model identifies key-value pairs (Dates, Amounts, Transaction IDs) and converts them into standardized JSON objects.
3. **Data Cleaning:** Script-based normalization (Python/JS) to fix formatting errors, curate currency types, and remove noise.

### Step 3: Storage & Routing

* **Final Destination:** Cleaned data is pushed to the client-specific **Supabase PostgreSQL** instance.
* **ERP Integration:** If required, the system triggers a final n8n node to push data directly into the client’s ERP (NetSuite, QuickBooks Enterprise, or proprietary SQL servers).

---

## 3. Client Onboarding & Security Protocol

1. **The Architecture Wizard:** No project starts without a full diagnostic via our Architecture Wizard to define variables and data complexity.
2. **Legal Gating:**
    * **NDA Execution:** Mandatory signature before the first data sample is uploaded.
    * **Venue Clause:** Confirmation of Hillsborough County, FL as the governing jurisdiction in the Master Service Agreement (MSA).
3. **Scoped Access:** We require "Read Only" access to legacy systems wherever possible.

---

## 4. Error Handling & Edge Cases (Fail-Safes)

### Human-in-the-Loop (HITL) Protocol

When the Processing Engine returns a low confidence score (< 85%):

1. **Auto-Flag:** The item is moved to a "Quarantine" table in Supabase.
2. **Internal Notification:** A Slack/Email alert is sent to our Internal Systems Team.
3. **Manual Verification:** An analyst reviews the extraction, corrects the field, and "Re-injects" it into the pipeline.
4. **Learning Loop:** Corrections are documented to fine-tune the parsing prompts for that specific client's document format.

### Corrupt/Incompatible Files

Files that fail ingestion entirely are rejected at the edge with an automated message to the client, requesting a re-submission in a supported, high-fidelity format.
