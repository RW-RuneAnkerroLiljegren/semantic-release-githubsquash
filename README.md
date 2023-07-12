# **semantic-release-githubsquash**

A tiny wrapper for [commit-analyzer](https://github.com/semantic-release/commit-analyzer) and [release-notes-generator](https://github.com/semantic-release/release-notes-generator) which works with squashed pull requests.

A big thank you to [semantic-release-unsquash](https://github.com/romap0/semantic-release-unsquash). This repository is a fork of the original project, modified to look at the body of a pull request to look for semantic-release commit signatures.

The idea with this wrapper is to allow for a headline as a commit message and use the body for all the semantic versioning messages.

[![npm latest version](https://img.shields.io/npm/v/semantic-release-githubsquash/latest.svg)](https://www.npmjs.com/package/semantic-release-githubsquash)

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

When you create squash commit in Github, you create a commit message where you have a subject and a body. GitHub adds the number of the pull request into the subject, so when you apply it to the target branch, this commit message looks like this:

```text
My foobar subject message with pull request number (#56)

The rest of the commit message in the body
```

If you want to use semantic versioning, but want to keep the headline you can do the following:

```text
My foobar subject message with pullrequest number (#56)

fix(System): The rest of the commit message in the body
```

If you are using this plugin, it will remove the headline from the commit message before the analysers see them, so what they see will be:

```text
fix(System): The rest of the commit message in the body
```

triggering the semantics. It does this for all the commits that the analyzers considers.
