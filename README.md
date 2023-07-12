# **semantic-release-githubsquash**

A tiny wrapper for [commit-analyzer](https://github.com/semantic-release/commit-analyzer) and [release-notes-generator](https://github.com/semantic-release/release-notes-generator) which works with squashed pull requests.

A big thank you to [semantic-release-unsquash](https://github.com/romap0/semantic-release-unsquash). This repository is a fork of the original project, modified to look at the body of a pull request to look for semantic-release commit signatures.

The idea with this wrapper is to allow for a headline as a commit message and and use the body for all the semantic versioning messages.

[![npm latest version](https://img.shields.io/npm/v/semantic-release-unsquash/latest.svg)](https://www.npmjs.com/package/semantic-release-unsquash)

## Install

```bash
$ npm install -D semantic-release-githubsquash
```

## Usage

The plugin does not have it`s own configuration, but it passes configuration to wrapped plugins

```json
{
  "plugins": [
    ["semantic-release-unsquash", {
      "commitAnalyzerConfig": {
        "preset": "angular",
        "parserOpts": {
          "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]
        }
      },
      "notesGeneratorConfig": {
        "preset": "angular",
        "parserOpts": {
          "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]
        },
        "writerOpts": {
          "commitsSort": ["subject", "scope"]
        }
      }
    }]
  ]
}
```

### Usage with Github

When doing a squash commit, you can add the desired headline. Github by default add the pull request number in the headline. It then give you all the squash commits in the body of the commit. Here you should use the correct commit messages with semantic-release, so it can generate the correct release notes and raise the version number accordingly.
