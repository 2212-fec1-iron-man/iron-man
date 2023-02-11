## Git workflow:
	**1. Sync your fork’s main branch on github with organization’s main branch.**
	**2. On your local machine, make sure you are on your main branch (git checkout main)**
	**3. Run git pull (this makes your local machine same as your github fork, which is the same as organization due to step 1)**
	**4. Create a branch to do your work using git checkout -b mybranch**
	**5. Work on your branch, save your changes, add them, commit them**
	**6. Run git push origin mybranch (this will push your local branch to your fork, creating a branch there if doesn't already exist)**
	**7. On your fork on github, switch to mybranch**
	**8. Create the pull request from here.**

<img src="https://recordit.co/7QQFraVbP9.gif">


**The overview section features two main areas: a photo area on the left and a product info area on the right.**

**The photo area consists of a large main photo, and a thumbnail image carousel.  By selecting an image on the carousel, the large main photo will update.  Similarly, if a user changes the main photo by clicking the “<“ or “>” symbols, the thumbnail image that is highlighted will change accordingly.**

**The product info area has a variety of product information.  At the top of the page, the average star review rating is displayed for the current product.  Clicking on the “Read all reviews” will bring the user to the Reviews section of the page.**

**Below the star rating is the product name and category, followed by the price.  If an item is on sale, the sale price will be shown in red and the original price will appear with a strikethrough.**

**The style selector will allow a user to select the different styles for the given product.  This will update the photo area as well as the style name and price.  The selected style is indicated with a checkmark inset with the photo.**

**The size selector will display all the in stock sizes for the product and will change with the style selected.  The user can select a size and then select a quantity.  The quantity is updated based on the number of items in stock for a particular product/style.**

**Lastly, below the photo and product information sections there is a small area that shows additional information about the product.  This will update based on the product selection.**




**At the top of q&a session, there is a search bar that can be used to search for questions, It will start rendering questions once the user has typed in three characters.**

<img src="https://recordit.co/qtoHuquys3.gif" width="700">

**Below the search bar is the question and answer list. Initially, the page will render four questions and two answers for each question, sorted by helpfulness. If there are more than two answers for a given question, a "load more answers" button will be activated to render two more answers until there are no more, at which point a "collapse" button will be displayed. The same functionality applies to the questions themselves.**


<img src="https://recordit.co/5XyQYO4X7c.gif" width="700">

**The helpful buttons are functional, meaning the numbers will accumulate and will be disabled after the user has clicked on them.** 


<img src="https://recordit.co/4TUq454kw2.gif" width="700">

**Images in the answer can be enlarged through the use of the ReactModal component,** 


<img src="https://recordit.co/ARMrmM8kr9.gif" width="700">

**If user click the report button, the forms' text areas will have a length check, and the submit button will not be activated until a certain length has been reached, and the same functionality applies to all the forms.**


<img src="https://recordit.co/Wz5RsrzWMy.gif" width="700">

**The "add answer" button for each question is allowing the user add new answers including upload photos.**

<img src="https://recordit.co/KPKPxKjAP6.gif" width="700">

**On the bottom of the Q&A session there would be a more answered questions button, which will render more questions on the page**

<img src="https://recordit.co/AbQn63hzdU.gif" width="700">

**Users can add questions by using add question button on the bottom**

<img src="https://recordit.co/8EJcmJVmQq.gif" width="700">




**Ratings & Reviews**

In this section is divided into two components, the rating breakdown for the current product are shown on the left and the reviews are shown on the right.

In the rating breakdown, by clicking on either the star rating number, the bar, or the number of the reviews for that star the reviews are filtered for the star selected and clicking again on any of the components mentioned removes the filter and all the reviews are shown again
The reviews can be sorted by relevance, newest, and helpfulness. 
If a review has images they can be enlarged by clicking on them.
If a review is deemed helpful it can be upvoted by clicking on ‘Yes’.
Two more reviews are loaded every time the ‘More Reviews’ button is clicked.
A new review can be added by clicking on the ‘Add a Review +’ button and filling out the form that pops up. 

<img src="http://g.recordit.co/EtyIDVzZsi.gif" width="700">
