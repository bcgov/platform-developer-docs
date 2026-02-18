# Platform dashboard templates (Sysdig)

Platform Services provides two Sysdig dashboard templates you can copy into your own Sysdig team. They are designed to help app teams (1) justify or reject quota increase requests with evidence, and (2) triage workload health/scaling issues quickly.

## Template 1: Resource utilization and quota (CPU / Memory / Storage)

Use this when you need to answer:

- Are we actually constrained by quota, or just over-requesting?
- Which namespaces/containers are the biggest drivers of CPU/memory usage?
- Which PVCs are closest to full?

What you’ll typically look at:

- Actual runtime usage vs requested/quota (namespace-level)
- Top containers by usage/limit ratio
- PVC utilization trends and “near-full” claims

[Detailed introduction]
(https://github.com/bcgov/platform-services-sysdig/blob/main/dashboard-template/docs_for_reousrces_dashboard.md)

## Template 2: Workload stability and scaling (per namespace)

Use this for quick triage and “is something wrong?” checks.
Most panels are “bad signals”, so a flat line at 0 is usually good.

What you’ll typically look at:

- CPU throttling pressure
- Restarts / crash trends
- OOM / memory-pressure signals
- HPA headroom (scaling ceiling pressure)
- Deployment gap (desired vs available)
- Stuck pod states and rollout blockers
- Network error indicators
- Maintenance readiness (drain blockers)

[Detailed introduction]
(https://github.com/bcgov/platform-services-sysdig/blob/main/dashboard-template/docs_for_workload_stability_dashboard.md)

## Apply these templates to your Sysdig team

Follow the repo instructions to import/apply the dashboard templates to your Sysdig team:
https://github.com/bcgov/platform-services-sysdig/blob/main/dashboard-template/README.md
