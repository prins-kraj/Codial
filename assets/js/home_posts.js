{
    // method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: "post",
                url: "/posts/create",
                data: newPostForm.serialize(),
                success:function (data) {
                    // console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
        <p>
            
            <small>
                <a class="delete-post-button" href="posts/destroy/${post._id}">X</a>
            </small>
            
            ${post.content}
            <br>
            <small>
                ${ post.user.name}
            </small>
        </p>
        <div class="post-comment">
            <h5>Comments</h5>
            
                <form action="/comments/create" id="new-comment-form" method="POST">
                    <!-- <textarea name="content" id="" cols="20" rows="2" placeholder="Comment.."></textarea> -->
                    <input type="text" name="content" placeholder="Comment here..." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Comment">
                </form>
           
            <div class="comment-list-container">
                <ul id="post-comment-${post._id}">
                    
                </ul>
            </div> 
        </div>
    </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) { 
            e.preventDefault();
            $.ajax({
                type: "get",
                url: $(deleteLink).prop('href'),
                success: function (response) {
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}