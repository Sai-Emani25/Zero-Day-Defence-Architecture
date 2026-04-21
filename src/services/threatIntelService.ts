/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface IOC {
  type: 'IP' | 'DOMAIN' | 'HASH';
  value: string;
  source: string;
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  lastSeen: string;
}

/**
 * Service to interact with Cloud-Native Threat Intelligence feeds.
 * Integrates real-time indicators of compromise (IOCs) into the hunting workflow.
 */
class ThreatIntelService {
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.VITE_THREAT_INTEL_API_KEY;
  }

  /**
   * Enriches raw telemetry text by matching it against known IOCs from cloud-native feeds.
   */
  async enrichTelemetry(telemetry: string): Promise<{ enrichedData: string; matches: IOC[] }> {
    const matches: IOC[] = [];
    const feed = await this.getLatestFeed();

    // Search for IOCs in the telemetry text
    feed.forEach(ioc => {
      if (telemetry.includes(ioc.value)) {
        matches.push(ioc);
      }
    });

    let enrichedData = telemetry;
    if (matches.length > 0) {
      enrichedData += "\n\n[CLOUD_INTEL_ENRICHMENT]\n";
      enrichedData += "Detected Known Indicators of Compromise (IOCs):\n";
      matches.forEach(match => {
        enrichedData += `- ${match.type}: ${match.value} | Source: ${match.source} | Risk: ${match.threatLevel} | ${match.description}\n`;
      });
    }

    return { enrichedData, matches };
  }

  /**
   * Simulates fetching the latest threat intel feed from a cloud-native provider (e.g., Google Cloud Threat Intel).
   * In a production environment, this would call an external API.
   */
  private async getLatestFeed(): Promise<IOC[]> {
    // Simulated cloud-native feed data
    return [
      {
        type: 'IP',
        value: '103.24.xx.xx',
        source: 'GCP-Threat-Intel',
        threatLevel: 'Critical',
        description: 'Known C2 infrastructure for specialized exploit delivery.',
        lastSeen: new Date().toISOString()
      },
      {
        type: 'DOMAIN',
        value: 'malicious-c2.sh',
        source: 'Cilium-Community-Intelligence',
        threatLevel: 'High',
        description: 'Command and Control domain targeting Tetragon-monitored clusters.',
        lastSeen: new Date().toISOString()
      },
      {
        type: 'IP',
        value: '185.195.1.42',
        source: 'Azure-Sentinel-Feed',
        threatLevel: 'High',
        description: 'Anomalous egress traffic destination observed in zero-day exploit campaigns.',
        lastSeen: new Date().toISOString()
      },
      {
        type: 'HASH',
        value: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
        source: 'AWS-GuardDuty-Threat-Intel',
        threatLevel: 'Critical',
        description: 'File hash associated with specialized rootkits bypassing standard isolation.',
        lastSeen: new Date().toISOString()
      }
    ];
  }
}

export const threatIntelService = new ThreatIntelService();
