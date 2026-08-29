# Multi-Language (i18n) Content Synchronization Rule

## Purpose
Ensure all content, copy, metadata, and UI labels maintain 100% parity between English (`en`) and Spanish (`es`) across the entire portfolio codebase.

## Mandatory Workflow on Content Changes
Whenever modifying or adding any content:
1. **Synchronize Data Files**:
   - Update `src/data/i18n/siteData.en.json` AND `src/data/i18n/siteData.es.json`.
   - Update `src/data/i18n/ui.en.ts` AND `src/data/i18n/ui.es.ts`.
   - If case studies or section-specific datasets are modified, update both language collections (e.g. `src/data/i18n/caseStudies.ts`).
2. **Clippo Assistant Alignment**:
   - If chatbot section configs or suggestion prompts change, ensure both `SECTION_CHATBOT_CONFIG_EN` and `SECTION_CHATBOT_CONFIG_ES` in `src/lib/chatbot-section-data.ts` are updated.
3. **Automated Verification**:
   - Run `npm run test:run` to execute the automated parity test suite at `src/data/i18n/__tests__/i18nSync.test.ts`.
   - The test will fail if any key, array length, or nested schema structure is missing in either language.
