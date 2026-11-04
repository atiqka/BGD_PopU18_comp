# Under-18 Population Density Mapping in Bangladesh (2022 vs 2030) Using Google Earth Engine

## Overview

This Google Earth Engine (GEE) application visualizes and compares the spatial distribution of the under-18 population across Bangladesh for the years 2022 and 2030. The workflow uses WorldPop-derived gridded population datasets and presents interactive side-by-side maps to support demographic, climate risk, humanitarian, urban planning, and service delivery analyses.

The application converts population counts into population density (persons per km²) and provides synchronized maps with an interactive swipe tool for visual comparison between baseline and projected population distributions.

---

## Study Area

The analysis covers the entire territory of Bangladesh using the national administrative boundary:

```javascript
users/atiqka/bgd_admbnda_adm0_bbs_20201113
```

---

## Data Sources

### Administrative Boundary

- Bangladesh Administrative Boundary (ADM0)
- Source: Bangladesh Bureau of Statistics (BBS)

### Population Data

WorldPop under-18 population gridded datasets:

| Year | Earth Engine Asset |
|--------|--------|
| 2022 | `WorldPop_Global2_BGD_2022_age-T` |
| 2030 | `WorldPop_Global2_BGD_2030_age-T` |

Stored as:

```javascript
projects/atiq-project-july2025/assets/
```

---

## Objective

The script allows users to:

- Visualize under-18 population density in Bangladesh
- Compare current and future demographic patterns
- Identify hotspots of child and adolescent population concentration
- Support climate adaptation, humanitarian planning, health systems, education planning, and child-focused vulnerability assessments

---

## Methodology

### 1. Load Bangladesh Boundary

The national boundary is used to clip all population rasters and standardize the spatial extent of analysis.

### 2. Load Population Rasters

Two gridded under-18 population datasets are loaded:

- 2022 baseline population
- 2030 projected population

### 3. Population Density Calculation

The original WorldPop-derived population values are converted to density per square kilometer.

Assuming:

- Grid resolution = 100 m × 100 m
- Pixel area = 0.01 km²

Population density is calculated as:

\[
Population\ Density = \frac{Population\ Count}{0.01}
\]

Resulting units:

```text
Persons per km²
```

---

## Population Density Classes

The script applies fixed classification thresholds for consistent comparison between years.

| Class | Population Density (persons/km²) |
|---------|---------|
| 1 | 0 – 50 |
| 2 | 50 – 100 |
| 3 | 100 – 150 |
| 4 | 150 – 200 |
| 5 | 200 – 300 |
| 6 | 300 – 400 |
| 7 | 400 – 500 |
| 8 | 500 – 600 |
| 9 | 600 – 800 |
| 10 | 800 – 1000 |
| 11 | >1000 |

---

## Visualization

The maps use an 11-class Viridis color palette:

```javascript
[
'#440154',
'#482475',
'#414487',
'#355F8D',
'#2A788E',
'#21908C',
'#22A884',
'#43BF71',
'#7AD151',
'#BFD53A',
'#FDE725'
]
```

### Color Interpretation

| Color | Interpretation |
|---------|---------|
| Dark Purple | Low under-18 population density |
| Blue-Green | Moderate density |
| Yellow | High under-18 population density |

---

## Interactive Features

### Linked Maps

The 2022 and 2030 maps are synchronized, allowing users to:

- Zoom simultaneously
- Pan simultaneously
- Maintain the same spatial reference

### Swipe Comparison Tool

A split-panel interface enables direct visual comparison between:

- Under-18 Population Density (2022)
- Under-18 Population Density (2030)

Users can drag the divider to inspect local changes across the country.

### Dynamic Legend

Each map includes a density legend displaying:

- Population density classes
- Associated color scheme
- Units in persons per km²

---

## Applications

This workflow can support:

### Climate Risk Analysis

- Child population exposure assessment
- Climate vulnerability mapping
- Heat and flood risk prioritization

### Humanitarian Planning

- Population targeting
- Emergency preparedness
- Child-centered disaster risk reduction

### Health and Education

- School infrastructure planning
- Pediatric health service allocation
- Vaccination and nutrition program targeting

### Climate Finance

- Equity-focused investment planning
- Vulnerable population prioritization
- Child-sensitive adaptation assessment

---

## Outputs

The application generates:

- Side-by-side visualization of under-18 population density (2022 vs 2030)
- Interactive swipe comparison interface
- Linked navigation between maps
- Standardized density classification across years

---

## Requirements

- Google Earth Engine account
- Access to the Bangladesh boundary asset
- Access to the WorldPop under-18 population assets
- Google Earth Engine JavaScript Code Editor

---

## Author

** Atiq Kainan Ahmed **

Email: atiqka@yahoo.com

GitHub: https://github.com/atiqka

---

## Suggested Use Cases

This application is particularly useful for:

- Child-focused climate adaptation planning
- Population exposure analysis
- Vulnerability and resilience assessments
- Humanitarian targeting
- Climate finance equity analysis
- National and sub-national demographic planning

---
