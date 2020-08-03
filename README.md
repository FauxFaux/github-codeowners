# github-codeowners
[![CircleCI](https://circleci.com/gh/jjmschofield/github-codeowners/tree/master.svg?style=shield)](https://circleci.com/gh/jjmschofield/github-codeowners/tree/master)
[![Known Vulnerabilities](https://snyk.io/test/github/jjmschofield/github-codeowners/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jjmschofield/github-codeowners?targetFile=package.json)
[![Coverage Status](https://coveralls.io/repos/github/jjmschofield/github-codeowners/badge.svg?branch=master)](https://coveralls.io/github/jjmschofield/github-codeowners?branch=master)

A CLI tool for working with GitHub CODEOWNERS.

Things it does:
* Output who owns each file in your repo (ignoring files listed in `.gitignore`)
* Output who owns a single file
* Output ownership information at a specific git commit
* Output ownership information of staged files
* Outputs lots of lovely stats
* Outputs handy formats for integrations (CSV and JSONL)
* Validates that the provided owners are in the correct format for github

## Installation
Install via npm globally then run

```shell script
$ npm i -g github-codeowners
$ github-codeowners --help 
Usage: github-codeowners [options] [command]
```

## Commands
### Audit
Compares every file in your current (or specified) directory against your CODEOWNERS rules and outputs the result of who owns each file.
```shell script
$ cd <your awesome project> 
$ github-codeowners audit
README.md
package.json
src/cli.ts      @jjmschofield
...
```

Ownership stats:
```shell script
$ github-codeowners audit -s
--- Counts ---
Total: 24 files (1378 lines)
Loved: 10 files (494 lines)
Unloved: 14 files (884 lines)
--- Owners ---
@jjmschofield: 10 files (494 lines)
```

Only files in a specific directory:
```shell script
$ github-codeowners audit -r src/
src/cli.ts      @jjmschofield
src/commands/audit.ts   @jjmschofield
...
```

Only unowned files:
```shell script
$ github-codeowners audit -u
.github/CODEOWNERS
.gitignore
```

Output in JSONL:
```shell script
$ github-codeowners audit -o jsonl
{"path":"src/commands/audit.ts","owners":["@jjmschofield"],"lines":48}
...
```

Output in CSV:
```shell script
$ github-codeowners audit -o csv
src/commands/audit.ts,@jjmschofield
```

Full usage information:
```shell script
$ github-codeowners audit --help
Usage: github-codeowners audit [options]

list the owners for all files

Options:
  -d, --dir <dirPath>          path to VCS directory (default: "/Users/jjmschofield/projects/github/github-codeowners")
  -c, --codeowners <filePath>  path to codeowners file (default: "<dir>/.github/CODEOWNERS")
  -o, --output <outputFormat>  how to output format eg: simple, jsonl, csv (default: "simple")
  -u, --unloved                unowned files only (default: false)
  -s, --stats                  output stats (default: true)
  -i, --include <partialPath>  paths begening with partial path only (default: '')
  -h, --help                   output usage information
```

### Who
Tells you who owns a given file: 
```shell script
$ cd <your awesome project> 
$ github-codeowners who <file>
<file> @some/team
```

Full usage:
```shell script
$ github-codeowners who --help                   
Usage: github-codeowners who [options] <file>

lists owners of a specific file

Options:
  -d, --dir <dirPath>          path to VCS directory (default: "/Users/jjmschofield/projects/github/snyk/registry")
  -c, --codeowners <filePath>  path to codeowners file (default: "<dir>/.github/CODEOWNERS")
  -o, --output <outputFormat>  how to output format eg: simple, jsonl, csv (default: "simple")
  -h, --help                   output usage information
```

### Git
Provides a list of files with their owners between commits (against the **current** version of CODEOWNERS).

Ownership of all files staged for commit:
```shell script
$ cd <your awesome project>
$ github-codeowners git
```

Ownership of files existing at a specific commit:
```shell script
$ github-codeowners git <commit sha>
```

Ownership of files changed between two commits:
```shell script
$ github-codeowners git <commit sha> <commit sha>
```

Output stats:
```shell script
$ github-codeowners git -s
```

Full usage:
```shell script
$ github-codeowners git --help                                                                                       
Usage: github-codeowners git [options] [shaA] [shaB]

lists owners of files changed between commits, a commit against head or staged against head.

Options:
  -d, --dir <dirPath>          path to VCS directory (default: "/Users/jjmschofield/projects/github/snyk/registry")
  -c, --codeowners <filePath>  path to codeowners file (default: "<dir>/.github/CODEOWNERS")
  -o, --output <outputFormat>  how to output format eg: simple, jsonl, csv (default: "simple")
  -s, --stats                  output stats, note line counts are not available for this command (default: false)
  -h, --help                   output usage information
```

## Output Formats
Check `github-codeowners <command> --help` for support for a given command, however generally the following outputs are supported:
* `simple` - tab delimited - terminal friendly output
* `jsonl` - line separated json - useful for streaming data to another command
* `csv` - csv delimited fields - useful to import into a spreadsheet tool of your choice

## Limits and Things to Improve
* It requires node
* It is not optimized
* The output interface might change
* Command syntax might change

## Shout outs
Inspired by [codeowners](https://github.com/beaugunderson/codeowners#readme) but implemented in Typescript with extra bells and whistles.
