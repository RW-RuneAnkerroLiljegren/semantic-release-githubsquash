const {
  analyzeCommits: originalAnalyzeCommits,
} = require('@semantic-release/commit-analyzer');
const {
  generateNotes: originalGenerateNotes,
} = require('@semantic-release/release-notes-generator');

const { modifySquashedCommits } = require('./get-unsquashed-commits');

const analyzeCommits = async (pluginConfig, context) => {
  const { commitAnalyzerConfig } = pluginConfig || {};
  const commits = modifySquashedCommits(context);

  return originalAnalyzeCommits(commitAnalyzerConfig ?? {}, {
    ...context,
    commits,
  });
};

const generateNotes = async (pluginConfig, context) => {
  const { notesGeneratorConfig } = pluginConfig || {};
  const commits = modifySquashedCommits(context);

  return originalGenerateNotes(notesGeneratorConfig ?? {}, {
    ...context,
    commits,
  });
};

module.exports = { analyzeCommits, generateNotes };
