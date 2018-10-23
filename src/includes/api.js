import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA';

export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }));
}

export function questionExist(question, authedUser) {
  if (question.optionOne.votes.includes(authedUser)) {
    return 'questionOne';
  } if (question.optionTwo.votes.includes(authedUser)) {
    return 'questionTwo';
  }
  return false;
}

export function sortTabs(questions, authedUser) {
  const result = [];
  Object.keys(questions).forEach((key) => {
    const questionObject = {};
    questionObject.vote = questionExist(questions[key], authedUser);
    questionObject.id = key;
    questionObject.timestamp = questions[key].timestamp;
    result.push(questionObject);
    result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  });

  return { result };
}

export function saveQuestionAnswer(answers) {
  return _saveQuestionAnswer(answers);
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function richQuestions(question, userid, authedUser) {
  const {
    id, author, timestamp, optionOne, optionTwo,
  } = question;

  return {
    id,
    authorName: userid.name,
    timestamp,
    authedUser,
    avatarURL: userid.avatarURL,
    author,
    optionOne: {
      votes: optionOne.votes,
      text: optionOne.text,
    },
    optionTwo: {
      votes: optionTwo.votes,
      text: optionTwo.text,
    },
  };
}
