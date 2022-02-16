var foo = 'foo'; // Variables declared outside of any function are considered global variables.
                 // These variables can be found on the window object.
(function () {
    // Any kind of function, will create a new variable scope. Variables declared in this
    // function will only be accessible inside this function, unless passed by reference through
    // a function call.

    // Lower level scope will always overwrite a higher level scope.
    var foo = 'bar';
    console.log(foo); // 'bar'
    // Global Variables can still be accessed through window object
    console.log(window.foo); // 'foo'

    // An array of Objects, similar to database records we will eventually be dealing with.
    var mockDatabase = [
        { _id: '123', name: 'Sneakers 1', price:'10', published: true, category:'Other', image: "images/shoes.jpeg"},
        { _id: '583', name: 'Barret', price:'15', published: true, category:'Accessories', image: "images/barret.jpeg" },
        { _id: '954', name: 'Leather Bag 3', price:'18', published: false, category:'Accessories', image: "images/bag.jpeg" },
        { _id: '384', name: 'Long-Sleeve Top', price:'5', published: false, category: 'Tops', image:"images/p1img1.jpeg" },
        { _id: '183', name: 'Blazer', price:'8', published: true, category:'Tops', image: "images/blazer.jpeg" },
        { _id: '007', name: 'Sweater Vest', price:'3', published: false,category:'Tops', image: "images/sweaterVest.jpeg" },
        { _id: '304', name: 'Dress', price:'1', published: true, category:'Other', image: "images/Dress.jpeg" },
        { _id: '729', name: 'Necklace', price:'1', published: false, category:'Accessories', image: "images/necklace.jpeg"},
        { _id: '734', name: 'Bag', price:'12', published: true, category:'Accessories', image: "images/bag2.jpeg"},
    ];


    function renderList2 (results) {
        var everyCard = document.querySelectorAll(".card");
        //console.log(this.selectors);
        //var flexBody = document.querySelector('.card')
        // clear out inner HTML to get rid of any older results
        //flexBody.innerHTML = '';
        everyCard.innerHTML = '';
        console.log('clear');
        for (var i = 0; i < everyCard.length; i++) {
            everyCard[i].innerHTML='';
        }
        // Map each database record to a card containing the HTML for it's row
        for (var i = 0; i < everyCard.length; i++) {
            //console.log(i);
            //console.log('everyCard: ', everyCard[i]); UNCOMMENT
            var flexCards2 = results.map(function (result, index) {
                //console.log(index);
                //console.log('length results' + results.length);
                for (var j = 0; j < results.length; j++) {
                    if (index === i) {
                        console.log(result.name);
                        everyCard[i].innerHTML = '<img src='+result.image+' class="imageThumb">' + result.name + " $" + result.price ;
                        //return result.name;
                    }

                    //put everthing in array and then go through a seperate for loop to clear things not in array

                }

            });
            flexCards2.forEach(function (row) {
                everyCard.innerHTML += row;
                console.log('new row')

            });

            var foo = 'renderList2';
            //console.log(foo); // 'renderList'
        }
    }
    renderList2(mockDatabase);
    //console.log( "2");


    /*
        function renderList (results) {
            var tableBody = document.querySelector('#results-table tbody');
            // clear out inner HTML to get rid of any older results
            tableBody.innerHTML = '';
            // Map each database record to a string containing the HTML for it's row
            var tableRows = results.map(function (result, index) {
                return '<tr><td>' + index + '</td><td>' + result.name + '</td><td>' +
                    result._id + '</td><td>' + result.price + '</td><td>' + result.published + '</td><td>' + result.category + '</td></td>';
            });
            // Set the contents of the table body to the new set of rendered HTML rows
            tableRows.forEach(function (row) {
                tableBody.innerHTML += row; // += adds to HTML instead of overwriting it entirely.
            });
            // Lower level scope once again overwrites what's above it.
            var foo = 'renderList';
            console.log(foo); // 'renderList'
        }
        //console.log(price + "2");
        renderList(mockDatabase);

     */

    // Function to Order results list
    function orderBy(sortValue) {
        // Sort method varies based on what type of value we're sorting
        var sortedResults = (sortValue === 'name') ?
            mockDatabase.sort(function (a, b) { // Strings need to be sorted in a slightly more compldex way
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                // Sorts alphabetically.  -1 puts it before. 1 puts it after
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            }) :
            mockDatabase.sort(function (a, b) { // Numbers a booleans are much simpler.
                // Just need postive or negative number
                // Object properties can be accessed through a string representing their name
                //console.log(a[sortValue] - b[sortValue]);
                return a[sortValue] - b[sortValue];
            });
        //renderList(sortedResults);
        console.log(sortedResults);
        renderList2(sortedResults);

    }
    // Change events trigger after the value of a form input changes
    document.querySelector('#orderBy').addEventListener('change', function(event){
        // Event is the JavaScript event that transpired, in our change a CHANGE event.
        // Target is the element it was performed on, useful for when the event targets
        // multiple elements.
        // Value has the name implies is the current value of the input element, if there is one
        orderBy(event.target.value);
    });


    //Function to display below a max value
    function below(maxValue) {
        //console.log('maxVal is ' + maxValue);
        var filteredResults = mockDatabase.filter(function (result) {
            //console.log("result is "+ result.price)
            if(parseInt(result.price) <= parseInt(maxValue)){
                console.log(result.price)
                //console.log(maxValue)
                //console.log("result is returned " + result.price + result.name);
                //console.log("result.price: " +typeof result.price + " maxValue: " + typeof maxValue)
                return result.price;
            }

            //console.log(filteredResults);

        });
        //renderList(filteredResults);
        renderList2(filteredResults);
    }


    // Change events trigger after the value of a form input changes
    document.querySelector('#below').addEventListener('change', function(event){
        // Event is the JavaScript event that transpired, in our change a CHANGE event.
        // Target is the element it was performed on, useful for when the event targets
        // multiple elements.
        // Value has the name implies is the current value of the input element, if there is one
        below(event.target.value);
        console.log('query below');
    });

    function category(categoryType) {
        var filteredResults = mockDatabase.filter(function (result) {
            //console.log("result is "+ result.price)
            if(result.category === categoryType){
                return result.category;
            }
        });
        //renderList(filteredResults);
        renderList2(filteredResults);
    }
    // Change events trigger after the value of a form input changes
    document.querySelector('#category').addEventListener('change', function(event){
        // Event is the JavaScript event that transpired, in our change a CHANGE event.
        // Target is the element it was performed on, useful for when the event targets
        // multiple elements.
        // Value has the name implies is the current value of the input element, if there is one
        category(event.target.value);
        console.log('query cat');
    });



    // Function to filter out unpublished results
    function togglePublished(showPublished) {
        // If showPublished is TRUE, only display published results
        // Filter will only inclue objects that return TRUE from it's query
        var filteredResults = mockDatabase.filter(function (result) {
            // If showPublished is TRUE, always show.
            // Otherweise only show if published is TRUE
            return showPublished || result.published;
        });
        //renderList(filteredResults);
        renderList2(filteredResults);
    }
    // Change events trigger after the value of a form input changes
    document.querySelector('#published').addEventListener('change', function(event){
        // in this case value is a string that we need to convert to a boolean
        var value = event.target.value === 'true';
        togglePublished(value);
    });

    //added
    /*
function togglePrice(lowPrice) {

        var filteredResults = mockDatabase.filter(function (result) {
            //console.log(price);
            if(result.price <10){
                console.log(result.price);
                return lowPrice || result.price
            }

        });
    renderList(filteredResults);
    //console.log(renderList(filteredResults))

}
togglePrice();


//Change events trigger after the value of a form input changes
document.querySelector('#price').addEventListener('change', function(event){

    // in this case value is a string that we need to convert to a boolean
   var value = event.target.value;
   console.log("value" +value)
   //var value = event.target.value === 'true';
   togglePrice(value);
});

*/

})(); // Wrap entire file in self executing function.
      // Keeping all variables declared in this file inside a local scope.