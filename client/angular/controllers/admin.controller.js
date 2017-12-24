/**
 * Created by Workspace on 29-Sep-17.
 */
quizApp.controller('admin',['$scope','$http',function(a,b){a.add=function(){var c={category:{name:a.category,question:[{q:a.q,options:{option1:a.option1,option2:a.option2,option3:a.option3,option4:a.option4},ans:a.ans,level:a.level}]}};b.post('/api/v1/question/add',c).then(function(e){a.response=e.data.message},function(){a.response='error occurred'})}}]);