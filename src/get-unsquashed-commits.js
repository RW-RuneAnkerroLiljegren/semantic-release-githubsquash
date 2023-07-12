//documentation about semantic-release plugins contexts: https://semantic-release.gitbook.io/semantic-release/developer-guide/plugin#context
const modifySquashedCommits = (context) => {
  const { commits } = context;
  const { logger } = context;

  const modifiedCommits = [];

  for(const commit of commits)
  {
    //logger.log('Commit: ' + commit.body);
    //logger.log('Subject: ' + commit.subject);
    //logger.log('Message: ' + commit.message);
    const commitLines = commit.message.split('\n');
    if(commitLines.length < 2)
    {
      logger.log('Skipping github commit: ' + commit.message);
      const newCommit = {
        ...commit
      };
      modifiedCommits.push(newCommit);
    }
    else
    {
      logger.log('Found github commit: ' + commit.message);
      
      commitLines.shift();
      commitLines.shift();
      const [subject, , ...body] = commitLines;

      const newCommit = {
      ...commit,
          subject: subject,
          body: body.join('\n'),
          message: commitLines.join('\n'),
      };
      logger.log('Modified commit: ' + newCommit.message);
      modifiedCommits.push(newCommit);
    }
  }
  
   return modifiedCommits;
};

module.exports = { modifySquashedCommits };
