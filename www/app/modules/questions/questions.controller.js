angular
  .module('starter.controllers')
  .controller('QuestionsController', questionsController);

  questionsController.$inject = ['$scope', 'PopupService'];
  function questionsController($scope, PopupService) {

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
      vm.shouldShowDelete = false;
      vm.shouldShowReorder = false;
      vm.listCanSwipe = true
    }
    
    function _edit(item) {
      alert('Edit Item: ' + item.id);
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



    vm.questions = [
      { id: 0,
        content: 'The underdeveloped countries governments are promoting slavery labors. What is ZARA\'s position on this?',
        upVotes: 4,
        downVotes: 3,
        status: 'ANSWERED',
        author: 'Florilda',
      },
      { id: 1,
        content: 'For ONU. ¿Are you favouring job quantity over quality?',
        upVotes: 1,
        downVotes: 0,
        status: 'UNANSWERED',
        author: 'Marcus',
      },
      { id: 2,
        content: 'What is China\'s government perspective on their workers health?',
        upVotes: 5,
        downVotes: 1,
        status: 'UNANSWERED',
        author: 'anonymous',
      },
      { id: 3,
        content: 'For ZARA. What are your efforts towards workers protection against risks?',
        upVotes: 3,
        downVotes: 2,
        status: 'UNANSWERED',
        author: 'anonymous',
      },
      { id: 4,
        content: 'For UNESCO. Are we losing culture diversity in favor of global markets?',
        upVotes: 9,
        downVotes: 8,
        status: 'CHOSEN',
        author: 'anonymous',
      },
      { id: 5,
        content: 'ZARA, could you please disappear? Your presence in this debate is such bullshit.',
        upVotes: 6,
        downVotes: 3,
        status: 'UNANSWERED',
        author: 'Horseman',
      },
      { id: 6,
        content: 'For the Bangladesh embassador. Is your country already a mature market or an emerging market yet?',
        upVotes: 0,
        downVotes: 0,
        status: 'UNANSWERED',
        author: 'anonymous',
      },
      { id: 7,
        content: 'For everyone. Is any of you considering globalisation\'s impact on global warming?',
        upVotes: 3,
        downVotes: 0,
        status: 'ANSWERED',
        author: 'GinTonic89',
      },
      { id: 8,
        content: 'Europe, what are your concerns on rising of refugee populations related to market slavery in underdeveloped countries?',
        upVotes: 3,
        downVotes: 0,
        status: 'UNANSWERED',
        author: 'anonymous',
      },
      { id: 8,
        content: 'ANYBODY WANTS SOME HAPPYNESS GOT TONS OF THEM YOU WANNA GET GLOBALLY HIGH?',
        upVotes: 1,
        downVotes: 0,
        status: 'BANNED',
        author: 'anonymous',
      }
    ];
  }