angular
  .module('starter.controllers')
  .controller('QuestionsController', questionsController);

questionsController.$inject = ['$rootScope', '$scope', 'PopupService', 'QuestionsService', 'QuestionConstants', '$interval'];
function questionsController($rootScope, $scope, PopupService, QuestionsService, QuestionConstants, $interval) {

  var vm = this;
  vm.addQuestion = _addQuestion;
  vm.markAsAcceptedAnswer = _markAsAcceptedAnswer;
  vm.markAsRejectedAnswer = _markAsRejectedAnswer;
  vm.downVote = _downVote;
  vm.upVote = _upVote;
  vm.markAsAnswered = _markAsAnswered;
  vm.banUser = _banUser;
  vm.chooseQuestion = _chooseQuestion;
  vm.questionIndex = 0;
  vm.questions = [];
  initialize();

  //////////////////

  function initialize(){
    vm.questionConstants = QuestionConstants;
    QuestionsService.getQuestions().then(
      function(questions){
        vm.allQuestions = questions;
        vm.canAddQuestion = true;
        vm.shouldShowDelete = false;
        vm.shouldShowReorder = false;
        vm.listCanSwipe = true;
        vm.highestId = 0;
        adaptQuestionsCharacteristics();
        questionsPushTimeout();
      }, function(error){
        $log.info('Could not retrieve the list of questions');
    });
  }

  function adaptQuestionsCharacteristics(){
    _.each(vm.allQuestions,function(question){
      question.status = QuestionConstants[question.status];
      if(question.yours && question.status !== QuestionConstants.ANSWERED){
        vm.canAddQuestion = false;
      }
      if(question.status === QuestionConstants.CHOSEN){
        question.chosenAnswer = true;
      } else if(question.status === QuestionConstants.BANNED){
        question.bannedAnswer = true;
      }
      vm.highestId = (question.id > vm.highestId)? question.id: vm.highestId;
    });
  }

  function questionsPushTimeout(){
    var pushInterval = $interval(function () {
      vm.questions.push(vm.allQuestions[vm.questionIndex]);
      vm.questionIndex++;
    }, Math.floor((Math.random() * 40000) + 3000));
    $scope.$on('$ionicView.beforeLeave',function () {
      $interval.cancel(pushInterval);
    });
  }

  function _addQuestion() {
    if(vm.canAddQuestion){
      vm.newQuestion = '';
      var addQuestionPopup = PopupService.getAddQuestionPopup(
        $scope,
        'questionsCtrl.newQuestion',
        'Add a question',
        "<p>Write your question and optionally add who is your question to.</p><p>Please, check your spelling as it will improve your credibility.</p>"
      );
      addQuestionPopup.then(function(res){
        if(res && vm.newQuestion){
          var confirmPopup = PopupService.getConfirmPopup(
            'Are you sure?',
            'Once you send your question, you won\'t be able to change it or take it back.',
            'Discard',
            'Send'
          );
          confirmPopup.then(function(res){
            if(res){
              vm.canAddQuestion = false;
              vm.questions.push({
                id: vm.highestId + 1,
                content: vm.newQuestion,
                upVotes: 0,
                downVotes: 0,
                status: QuestionConstants.ANSWERED,
                author: 'You',
                yours: true
              });
            }
          });
        }
      });
    }
  }

  function _downVote(question){
    if(!angular.isDefined(question.downVoted)){
      if(question.upVoted){
        question.upVoted = false;
        question.upVotes--;
      }
      question.downVoted = true;
      question.downVotes++;
    } else {
      if(question.downVoted){
        question.downVoted = false;
        question.downVotes--;
      } else {
        if(question.upVoted){
          question.upVoted = false;
          question.upVotes--;
        }
        question.downVoted = true;
        question.downVotes++;
      }
    }
  }

  function _upVote(question){
    if(!angular.isDefined(question.upVoted)){
      if(question.downVoted){
        question.downVoted = false;
        question.downVotes--;
      }
      question.upVoted = true;
      question.upVotes++;
    } else {
      if(question.upVoted){
        question.upVoted = false;
        question.upVotes--;
      } else {
        if(question.downVoted){
          question.downVoted = false;
          question.downVotes--;
        }
        question.upVoted = true;
        question.upVotes++;
      }
    }
  }

  function _markAsAcceptedAnswer(question){
    if(!angular.isDefined(question.acceptedAnswer) &&
        !angular.isDefined(question.rejectedAnswer)){
      question.acceptedAnswer = true;
    } else {
      question.acceptedAnswer = !question.acceptedAnswer;
    }
  }

  function _markAsRejectedAnswer(question){
    if(!angular.isDefined(question.acceptedAnswer) &&
        !angular.isDefined(question.rejectedAnswer)){
      question.rejectedAnswer = true;
    } else {
      question.rejectedAnswer = !question.rejectedAnswer;
    }
  }

  function _markAsAnswered(question){
    if(!angular.isDefined(question.answeredAnswer)){
      question.chosenAnswer = false;
      question.bannedAnswer = false;
      question.answeredAnswer = true;
      question.status = QuestionConstants.ANSWERED;
    }
  }

  function _banUser(question){
    if(!angular.isDefined(question.bannedAnswer) &&
        !angular.isDefined(question.chosenAnswer)){
      question.bannedAnswer = true;
      question.status = QuestionConstants.BANNED;
    } else {
      question.bannedAnswer = !question.bannedAnswer;
      question.status = (question.status === QuestionConstants.UNANSWERED)? QuestionConstants.BANNED : QuestionConstants.UNANSWERED;
    }
  }

  function _chooseQuestion(question){
    if(!angular.isDefined(question.chosenAnswer) &&
        !angular.isDefined(question.bannedAnswer)){
      question.chosenAnswer = true;
      question.status = QuestionConstants.CHOSEN;
    } else {
      question.chosenAnswer = !question.chosenAnswer;
      question.status = (question.status === QuestionConstants.UNANSWERED)? QuestionConstants.CHOSEN : QuestionConstants.UNANSWERED;
    }
  }
}