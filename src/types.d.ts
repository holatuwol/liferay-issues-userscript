interface JIRAComment {
  id : string;
  created : string;
  author : {
    key : string;
    name : string;
    displayName : string;
    avatarUrls : any;
  };
  renderedBody : string;
}

interface JIRAIssueType {
  id: string;
  name: string;
}

interface JIRAProject {
  id: string;
  key: string;
  issuetypes: Array<JIRAIssueType>;
}