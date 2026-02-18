# Incident Logging Specification

## Overview
This document outlines the specifications for the manual incident logging system.

## Required Fields
- **Severity**: The severity level of the incident.
- **Service**: The service affected by the incident.
- **External Reference ID**: An identifier for external tracking.
- **Source**: The origin of the incident report.

## Future-Ready Data Model
The data model is designed to accommodate future integrations with external systems by including fields like `externalReferenceId` and `source`.
