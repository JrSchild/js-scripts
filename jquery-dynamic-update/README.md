# jquery-dynamic-update

A jQuery plugin to dynamically update the DOM with new content. Useful for when a template is used and the state of the DOM must be preserved.

Define a dynamic element with the data attribute:

    <div id="template">
        <div data-dynamic="users">
            <!-- Do stuff in your template -->
        </div>
    </div>

To only update the contents of users call:

    $('#template').dynamicUpdate(html, ['users']);

The text of html will be parsed and only users will be updated.

#### Controlling items in a list.

If your DOM looks like this:

    <div id="template">
        <div data-dynamic="users">
            <li data-dynamic="users:1">User 1</li>
            <li data-dynamic="users:2">User 2</li>
            <li data-dynamic="users:3">User 3</li>
        </div>
    </div>

It's also easy to update individual items in this list with:

    $('#template').dynamicUpdate(html, ['users:1|2']);

Add new added lines:

    $('#template').dynamicUpdate(html, ['users:+']);

Remove removed lines from DOM:

    $('#template').dynamicUpdate(html, ['users:x']);


