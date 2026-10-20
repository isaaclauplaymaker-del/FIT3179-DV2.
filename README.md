# Literacy and Numeracy in Australia

FIT3179 Data Visualisation 2, Isaac Lau. A single scrolling story for Malaysian readers interested in Australian school education. It asks where support needs are concentrated and what national averages hide.  
https://isaaclauplaymaker-del.github.io/FIT3179-DV2./#national-picture

## View and edit

Open `index.html` with VS Code Live Server, or run `python -m http.server 8000` in this folder and visit `http://localhost:8000`. The Vega libraries load from the pinned CDN URLs in the HTML. Assessment data and simplified map geometry are embedded in `js/visualisation.js`; no Excel connection is required to display the charts.

Assessment year, year level and subject controls update applicable NAPLAN views. Charts 1 and 9 retain all year levels; the subject-comparison views retain both subjects; ABS context remains 2025; charts 12 and 13 retain the 2023–2026 window. Chart 14 compares 2023 with the selected year, or displays the baseline when 2023 is selected.

Choose a state in the Follow a state selector, or click a state mark in charts 3, 4, 7, 11 or 13. The selection highlights matching marks without removing other jurisdictions from the box plot. Reset filters restores 2026, Year 9, Reading and all states.

## Chart specifications

The `charts/` folder contains 14 readable, self-contained Vega/Vega-Lite specifications exported from the live definitions for the default assessment: 2026, Year 9, Reading, all states. The running page uses those same definitions with the selected data. After changing the definitions, run `node tools/export-specs.cjs` to refresh the snapshots and source links.

Charts: heatmap; proficiency stacked bars; choropleth; proportional-symbol map; non-contiguous area cartogram; school-sector treemap; jurisdiction box plots; remoteness connected dots; gender-gap diverging bars; parental-education parallel coordinates; participation bullet chart; national trends; jurisdiction percentage trends; parental-education endpoint slopes.

## Sources and transformations

- ACARA, NAPLAN national results, 2026 workbook: https://www.acara.edu.au/reporting/national-report-on-schooling-in-australia/naplan-national-results
- Original workbook: https://dataandreporting.blob.core.windows.net/anrdataportal/ANR-ExcelDownloads/2026NAP/NAPLAN%20national%20results%20dataset.xlsx
- ABS Schools 2025: https://www.abs.gov.au/statistics/people/education/schools/2025 . State enrolments are Government plus non-Government counts from Map 1's accessible description. Sector counts are from Table 1.
- ABS ASGS Edition 3 (2021) boundaries via geoBoundaries gbOpen AUS ADM1: https://www.geoboundaries.org/api/current/gbOpen/AUS/ADM1/ . CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ . Boundary vertices were simplified, coordinates rounded and ring orientation normalised; small islands and Other Territories are omitted. These are display outlines, not precise administrative reference maps.
- Introductory context: Australian Curriculum Literacy and Numeracy capability explanations, linked in the webpage.

NAPLAN Results fields used: Calendar year, Year level, Domain, State/territory, Student attribute, Subgroup, Reporting flag, Participation (%), Participation (Num), Exempt (%), Needs additional support (%), Developing (%), Strong (%), Exceeding (%), and Strong or above (%). Selected year/grade/subject blocks use compact arrays whose field order is documented immediately above `FILTER_DATA`. Values are retained to four decimals and shown to one.

Gender gaps are female minus male Strong-or-above shares, in percentage points. Chart 14 uses the workbook's Strong-or-above field. Jurisdiction trends show actual support percentages on a fixed 0–40% vertical scale among the same seven jurisdictions in every year; Tasmania is excluded throughout because 2026 achievement is suppressed. These are different annual cohorts, and changes do not test significance. The national heatmap and state choropleth share a fixed 0–40% orange colour scale. Category totals are not normalised. Exempt remains separate from the four proficiency categories. Parental-education profiles omit Exempt and Not stated without normalisation.

Tasmania's 2026 achievement is suppressed (`s.p.`), stored as null and coloured grey. Participation remains available. Source flags, including `#`, remain in applicable tooltips; consult the original workbook's reporting notes when interpreting flagged results. A missing result is never treated as zero. NAPLAN achievement before the 2023 measurement reset is not joined to this series. ABS enrolments and NAPLAN participant counts have different scopes and are not multiplied together to estimate support counts.

## Teaching alignment and submission

The implementation applies the taught marks/channels, narrative, colour/layout, table idioms, hierarchy, maps/projections, cartograms and selection concepts from Weeks 1–10. The exact JavaScript linking and prepared cartogram layout are custom implementations, not copied lecture examples. The treemap uses Vega hierarchy transforms; the remaining charts use Vega-Lite.

The webpage and code do not replace the required original hand-drawn sketch, studio feedback process, submission template, actual deployed-page screenshot or interview. Chart count and advanced-idiom classification remain subject to the marking rubric.

AI acknowledgement: OpenAI ChatGPT assisted with planning, source checking, data preparation, code, debugging and wording. The author is responsible for reviewing and explaining the work.

## Revised presentation

A compact sticky assessment dock stays visible beyond the first chapter, with one set of year, year-level and subject controls. The opening offers Let’s explore and Find a state links. The closing material explains Why, What and How for general readers.

The enrolment map uses separately scaled state polygons within pale reference outlines. Geometry is first projected with a conic equal-area projection, then each polygon is scaled uniformly around its centroid. A common polygon-area-per-enrolment factor preserves proportional areas across jurisdictions. These prepared display coordinates are rendered with an identity projection; source counts and original map outlines are unchanged. Tasmania and ACT are separately labelled. This is distinct from the choropleth and proportional-symbol participant map.
