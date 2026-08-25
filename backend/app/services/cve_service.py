import httpx
from ..models import CVE, Asset, CVESeverityEnum, CVEAssetMatch
from ..database import SessionLocal

async def fetch_cves(product: str):
    url = f"https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch={product}"
    async with httpx.AsyncClient() as client:
        # Mock request since it's an example
        # response = await client.get(url)
        # return response.json()
        pass

def filter_new_cves(cves):
    pass

def calculate_severity(cvss: float):
    if cvss >= 9.0: return CVESeverityEnum.CRITICAL
    if cvss >= 7.0: return CVESeverityEnum.HIGH
    if cvss >= 4.0: return CVESeverityEnum.MEDIUM
    return CVESeverityEnum.LOW

def match_against_assets(cve: CVE, assets: list[Asset]):
    pass

def format_cve_alert(cve: CVE, affected_servers):
    pass
