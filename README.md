# Gendiff - Compare configuration files

### CI Status
[![Node CI](https://github.com/la-moche/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/la-moche/frontend-project-46/actions/workflows/nodejs.yml)

### Hexlet tests and linter status
[![Actions Status](https://github.com/la-moche/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/la-moche/frontend-project-46/actions)

### SonarCloud Analysis
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=la-moche_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=la-moche_frontend-project-46)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=la-moche_frontend-project-46&metric=bugs)](https://sonarcloud.io/summary/new_code?id=la-moche_frontend-project-46)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=la-moche_frontend-project-46&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=la-moche_frontend-project-46)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=la-moche_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=la-moche_frontend-project-46)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=la-moche_frontend-project-46&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=la-moche_frontend-project-46)

## Installation

```bash
npm install -g @hexlet/code
```

### Usage

```bash
# JSON files
gendiff __fixtures__/file1.json __fixtures__/file2.json
gendiff __fixtures__/file1.json __fixtures__/file2.json --format stylish

# YAML files  
gendiff __fixtures__/file1.yml __fixtures__/file2.yml
gendiff __fixtures__/file1.yml __fixtures__/file2.yml --format stylish

# Mixed formats (JSON + YAML)
gendiff __fixtures__/file1.json __fixtures__/file2.yml

# For nested structures
gendiff __fixtures__/nested1.json __fixtures__/nested2.json
gendiff __fixtures__/nested1.yml __fixtures__/nested2.yml

# For plain format
gendiff __fixtures__/nested1.json __fixtures__/nested2.json --format plain

# For JSON format
gendiff __fixtures__/file1.json __fixtures__/file2.json --format json
```
### Example

[![asciicast](https://asciinema.org/a/BJ9ePyvY9IVS6uBoS4Rt4Ta1J.svg)](https://asciinema.org/a/BJ9ePyvY9IVS6uBoS4Rt4Ta1J)
[![asciicast](https://asciinema.org/a/rDBNstfQSgk7thTo6y5qlmaqA.svg)](https://asciinema.org/a/rDBNstfQSgk7thTo6y5qlmaqA)
[![asciicast](https://asciinema.org/a/9sLs1TCmx3ssoc3lmU1eC0YCf.svg)](https://asciinema.org/a/9sLs1TCmx3ssoc3lmU1eC0YCf)
[![asciicast](https://asciinema.org/a/bCTg35FY4LNRi5OfIWbedv3lc.svg)](https://asciinema.org/a/bCTg35FY4LNRi5OfIWbedv3lc)
[![asciicast](https://asciinema.org/a/om3sZq2C7q49YK9Z2QIxtC41U.svg)](https://asciinema.org/a/om3sZq2C7q49YK9Z2QIxtC41U)
