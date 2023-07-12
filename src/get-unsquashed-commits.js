const getUnsquashedCommits = (context) => {
  const { commits } = context;

  return commits.reduce((acc, commit) => {
    if (!commit.body.startsWith('* ')) {
      return [...acc, commit];
    }

    const stashedCommits = commit.body.split('\n');

    return [
      ...acc,
      commit,
      ...stashedCommits.map((stashedCommit) => {
        const [subject, , ...body] = stashedCommit;
        return {
          ...commit,
          subject,
          body: body.join('\n'),
          message: stashedCommit,
        };
      }),
    ];
  }, []);
};

module.exports = { getUnsquashedCommits };
