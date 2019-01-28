// Variables
const tweetList = document.querySelector('#tweet-list');


// Event listeners
eventListeners();

function eventListeners() {
    // Form submisions
    document.querySelector('form').addEventListener('submit', newTweet);

    // Remowe tweet from the list
    tweetList.addEventListener('click', removeTweet);

    // Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}


// Functions
function newTweet(evt) {
    evt.preventDefault();

    // Reed the textarea value
    const tweet = document.querySelector('#tweet').value;

    // Create the remove button
    const removeButton = document.createElement('a');
    removeButton.classList = 'remove-tweet';
    removeButton.textContent = 'X';

    // Create en <li> element
    const li = document.createElement('li');
    li.textContent = tweet;

    // Add the remove button to each tweet
    li.appendChild(removeButton);

    // Add to the list
    tweetList.appendChild(li);

    // Add to Local Storage
    addTweetLocalStorage(tweet);

    this.reset();
}

// Remove the tweet from the DOM 
function removeTweet(evt) {
    if(evt.target.classList.contains('remove-tweet')) {
        evt.target.parentElement.remove();
    }
    
    // Remove from the Storage
    removeTweetLocalStorage( evt.target.parentElement.textContent );
}

// Add the tweets into the Local Storage
function addTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();

    // Add the tweet into array
    tweets.push(tweet);

    // Convert tweet array  into String
    localStorage.setItem('tweets', JSON.stringify( tweets ));
}

function getTweetsFromStorage() {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');

    // Get the values, if null is returned then we create an ampty array
    if ( tweetsLS === null ) {
        tweets = [];
    } else {
        tweets = JSON.parse( tweetsLS );
    }
    return tweets;
}

// Prints Local Storage Tweets on load
function localStorageOnLoad() {
    let tweets = getTweetsFromStorage();

    // Loop throught Storage and then print the value
    tweets.forEach(function(tweet) {
        // Create the remove button
        const removeButton = document.createElement('a');
        removeButton.classList = 'remove-tweet';
        removeButton.textContent = 'X';

        // Create en <li> element
        const li = document.createElement('li');
        li.textContent = tweet;

        // Add the remove button to each tweet
        li.appendChild(removeButton);

        // Add to the list
        tweetList.appendChild(li);
    });
}

// Remove tweet from Local Storage

function removeTweetLocalStorage(tweet) {
    // Get tweet from the Storage
    let tweets = getTweetsFromStorage();

    // Remove the X from the tweet
    const tweetDelete = tweet.substring( 0, tweet.length -1 );

    // Loop Throught the tweets and remove the tweet that's equal
    tweets.forEach(function(tweetLS, index) {
        if (tweetDelete === tweetLS) {
            tweets.splice(index, 1)
        }
    });

    // Save the data
    localStorage.setItem('tweets', JSON.stringify(tweets));
}