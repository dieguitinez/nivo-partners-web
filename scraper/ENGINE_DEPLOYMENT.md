# Nivo Partners | Proprietary Engine (Neural Sandbox) Deployment Protocol

This document outlines the protocol for deploying and executing the Asynchronous Neural Pipeline (Google Maps Scraper) on your GCP Sovereign Infrastructure (`nivo-core-01`).

## 1. Environment Preparation

Connect to the VM via SSH and ensure all dependencies are initialized:

```bash
# Clone the repository (if not present)
git clone <repository_url> nivo-engine
cd nivo-engine/scraper

# Initialize Python Virtual Environment
python3 -m venv venv
source venv/bin/activate

# Install Dependencies
pip install -r requirements.txt
```

## 2. Infrastructure Requirements (Linux VM)

Since the engine uses Selenium, it requires a "Headless" browser environment on the VM:

```bash
# Install Chrome and Driver for Ubuntu/Debian
sudo apt update
sudo apt install -y google-chrome-stable
```

*Note: The script `main.py` is configured with `HEADLESS = True` by default in the neural sandbox branch to avoid display errors.*

## 3. Execution Cycle

Run the ingestion cycle to update the revenue core with fresh lead data:

```bash
python main.py
```

Results are archived in the `/data` directory as persistent lead maps.

## 4. Maintenance & Scaling

- **Logs**: Monitor `debug_error.png` if the ingestion fails.
- **Scaling**: For high-volume yield engineering, deploy multiple instances of the sandbox using Docker containers (Phase 4).

---
**Status**: Bank-Grade Encryption Verified | Asynchronous Transmission Active
