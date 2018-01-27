angular
  .module('starter.controllers')
  .controller('QuestionsController', questionsController);

  questionsController.$inject = ['$scope', 'PopupService', 'QuestionsService', 'QuestionConstants'];
  function questionsController($scope, PopupService, QuestionsService, QuestionConstants) {

    var vm = this;
    vm.addQuestion = _addQuestion;
    vm.markAsAcceptedAnswer = _markAsAcceptedAnswer;
    vm.markAsRejectedAnswer = _markAsRejectedAnswer;
    vm.moveItem = _moveItem;
    vm.onItemDelete = _onItemDelete;
    vm.downVote = _downVote;
    vm.upVote = _upVote;

    initialize();

    //////////////////

    function initialize(){
      vm. questionConstants = QuestionConstants;
      QuestionsService.getQuestions().then(
        function(questions){
          vm.questions = questions;
          vm.canAddQuestion = true;
          vm.shouldShowDelete = false;
          vm.shouldShowReorder = false;
          vm.listCanSwipe = true;
          vm.highestId = 0;
          adaptQuestionsCharacteristics();
        }, function(error){
          $log.info('Could not retrieve the list of questions');
      });
    }

    function adaptQuestionsCharacteristics(){
      _.each(vm.questions,function(question){
        question.status = QuestionConstants[question.status];

        if(question.yours && question.status !== QuestionConstants.ANSWERED){
          vm.canAddQuestion = false;
        }
        vm.highestId = (question.id > vm.highestId)? question.id: vm.highestId;
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


    function _share(item) {
      alert('Share Item: ' + item.id);
    }
    
    function _moveItem(item, fromIndex, toIndex) {
      vm.questions.splice(fromIndex, 1);
      vm.questions.splice(toIndex, 0, item);
    }
    
    function _onItemDelete(item) {
      vm.questions.splice(vm.questions.indexOf(item), 1);
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

  }