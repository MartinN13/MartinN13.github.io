---
layout: post
title:  "Beginner mistakes"
categories: ruby-on-rails
---
I recently set out to build a simple book store using Rails. The project is running
on heroku [here](http://martin-nabhan-book-store.herokuapp.com),
and the code is available [here](https://github.com/MartinN13/book-store).
While starting to shape the index page of the books controller I happened upon a
peculiar error. I had created a banner which was supposed to highlight the first
book in the database with an extra big cover picture.
The code for the banner looked like this:

{% highlight erb html %}
<div class="banner">
    <%= link_to image_tag(@books.first.image.url), @books.first, class: 'banner-book-image' %>
    <h2 class="banner-title"><%= @books.first.title %></h2>
    <p class="banner-author">by <%= @books.first.author %></p>
    <p class="banner-description"><%= @books.first.description %></p>
</div>
{% endhighlight %}

I started my server and everything was fine. However as I pushed my changes to Heroku
I suddenly got a (for me quite cryptic) error telling me: `undefined method 'image' for nil:NilClass`.

My first clue was there was obviously some issue with calling `@books.first.image.url`,
I just wasn't sure why this wasn't affecting my local server. So the only logical
conclusion to be made was that there was something different between my development
and production server. After some thinking I finally reached the (rather simple)
conclusion that my databases were different! On my local server I already had 4 books
put into the database, while my Heroku database was empty. Obviously I can't call
`@books.first.image.url` if there are no books in the database!

The solution was simple, just add a check before calling upon my `@books` variable:

{% highlight erb html %}
<div class="banner">
  <% unless @books.first.nil? %>
    <%= link_to image_tag(@books.first.image.url), @books.first, class: 'banner-book-image' %>
    <h2 class="banner-title"><%= @books.first.title %></h2>
    <p class="banner-author">by <%= @books.first.author %></p>
    <p class="banner-description"><%= @books.first.description %></p>
  <% end %>
</div>
{% endhighlight %}

Simple as that! Now when there are no books in the database the view loads without
populating the banner. While it might be a simple mistake this gave me the realization
that I should 1. be less lazy about writing tests and 2. make sure to check if my
variable is empty before using it.

I'm sure this is one of many beginner mistakes I'll come to face during my journey
into Rails land, but since they're great learning experiences I'll just chalk it
down to experience.
