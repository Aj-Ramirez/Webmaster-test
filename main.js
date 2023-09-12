
$(document).ready(function () {
     // Function for Test 2 "Get the user name"
     $('#load_btn').on('click',  function(){
          // Generate random numbers
          const randomIndex = Math.floor(Math.random() * 10); // 0 to 10

           // GET data from API
           $.get("https://jsonplaceholder.typicode.com/users", function(data, status){
                    
               // Check if data is valid to these condition
               if (status === "success" && Array.isArray(data) && randomIndex < data.length) {
                    // process and display user name on DOM 
                    const randomUser = data[randomIndex].name;
                    $('#display_username').html(`${randomUser}`);
                    console.log(randomIndex + 1, randomUser);
                   
                } else {
                    console.log("Error fetching user data or invalid random index.");
                }
          })
     })

      // Test 3  "Builds 8 cards"
     // Clone the original card and create additional cards
     var originalCard = $('.card');
     var container = $('#promotion-cards-row');

     for (var i = 0; i < 7; i++) { 
          var clonedCard = originalCard.clone();
          container.append(clonedCard);

          if ((i + 1) % 4 === 0) { 
               container.append('<br>');
          }
     }

     // Loop through the first 8 items(cards) in the dataArray
     for (let i = 0; i < 8 && i < dataArray.length; i++) {
          const dataItem = dataArray[i];

          // Create HTML elements for each item within the cloned cards ang get data
          const card = $('.card').eq(i);
               card.find('#title').text(dataItem.title);
               card.find('#desc').text(dataItem.body);
               card.find('.image').css('background-image',
                                   'url(' + dataItem.thumbnailUrl + ')'
                                   );
     }
     // Append the aditional cards with informataion to #promotion-cards-row
     container.append($('.card'));

     // Test 4 "check #userlist" and display user's email that their zipcode starts with “5”.
     if ($('#usersList').length) {
          // Fetch the JSON data
          $.getJSON('https://jsonplaceholder.typicode.com/users', function(users) {
               // Filter users whose zipcode starts with "5"
               var filteredUsers = users.filter(function(user) {
                    return user.address.zipcode.startsWith('5');
               });

               // Create an unordered list and append matching users to it
               var userList = $('<ul></ul>');
               $.each(filteredUsers, function(index, user) {
                    userList.append('<li>' + user.username + '</li>');
               });

               // Append the list to the #usersList element
               $('#usersList').append(userList);
          });
     }
      // Bonus Question
     // Fetch user data from an API
     $.ajax({
          url: 'https://jsonplaceholder.typicode.com/users',
          method: 'GET',
          dataType: 'json',
          success: function (userData) {
               // Sort the array by user NAMES
               userData.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
               });

               // Create a list of email addresses
               var emailList = "<ul>";
               for (var i = 0; i < userData.length; i++) {
                    emailList += "<li>" + userData[i].email + "</li>";
               }
               emailList += "</ul>";

               // Append the list to the #list-of-users div
               $('#usersList').append(emailList);
          },
          error: function () {
          console.error('Failed to fetch user data from the API.');
          }
     });

       // Footer "Text color turns blue when you see"
      // Function to check if an element is in the viewport
     function isElementInViewport(element) {
          var rect = element.getBoundingClientRect();
          return (
               rect.top >= 0 &&
               rect.left >= 0 &&
               rect.bottom <= $(window).height() &&
               rect.right <= $(window).width()
          );
     }
     // Function to handle the color change
     function handleColorChange() {
          var $myDiv = $('#footer p');
          if (isElementInViewport($myDiv[0])) {
               $myDiv.css('color', 'blue');
          } else {
               $myDiv.css('color', 'inherit');
          }
     }
     // Attach a scroll event listener to the window
     $(window).on('scroll', handleColorChange);
     handleColorChange();

})