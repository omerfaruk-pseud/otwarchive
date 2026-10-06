@javascript
Feature: Rich text editor for Comments

  Scenario Outline: Using the Rich Text Editor
    Given <commentable>
    When I am logged in as "commenter"
      And I view <commentable> with comments
    Then I should see "Rich Text"
    When I follow "Rich Text"
      And I send keys "hello" to Lexxy
      And I send keys "[:control, b]" to Lexxy
      And I send keys ":space" to Lexxy
      And I send keys "world" to Lexxy
    And I press "Comment"
      Then I should see "Comment created!"
      And I should see the text with tags "<p>hello<strong> world</strong></p>"
    When I follow "Rich Text"
      And I send keys "example website" to Lexxy
      And I send keys "[:control, a]" to Lexxy
      And I send keys "[:control, k]" to Lexxy
      And I send keys "https://example.com" to '.input[type="url"]'
      And I press "Link" within "div[data-dropdown-panel]"
      And I press "Comment"
    Then I should see "Comment created!"
      And I should see the text with tags '<p><a href="https://example.com" rel="nofollow">example website</a></p>'

    Examples:
      | commentable |
      | the work "Generic Work" |
      | the admin post "Five Things" |



  Scenario Outline: Using the RTE for a reply
    Given <commentable>
      And a comment "This is beautiful" by "commenter" on <commentable>
    When I am logged in as "creator"
      And I view <commentable> with comments
      And I follow "Reply" within ".odd"
    Then I should see "Rich Text" within ".odd"
    When I follow "Rich Text" within ".odd"
      And I send keys "Thank you!" to Lexxy
      And I press "Comment" within ".odd"
    Then I should see "Comment created!"
      And I should see "Thank you!" within ".thread"

    Examples:
      | commentable |
      | the work "Generic Work" |
      | the admin post "Five Things" |

  # Scenario: Using the RTE in a thread
  # And I visit the reply page to the comment on "No Guest Comments Work"
  # Then I should see "Thread"

  # Using the RTE for editing, in a thread
  # Then I should see "Comment was successfully updated"

  # Using the RTE for replying, in a thread

  Scenario Outline: Using the RTE for editing a comment
    Given <commentable>
      And a comment "This is OK" by "commenter" on <commentable>
    When I am logged in as "commenter"
      And it is currently 1 second from now
      And I view <commentable> with comments
      And I follow "Edit"
      And I follow "Rich Text" within ".odd"
      And I send keys "[:control, a]" to Lexxy
      And I send keys "Actually, this is awesome" to Lexxy
      And I press "Update"
    Then I should see "Actually, this is awesome"
      And I should see Last Edited in the right timezone
    But I should not see "This is OK"

    Examples:
      | commentable |
      | the work "Generic Work" |
      | the admin post "Five Things" |

  Scenario Outline: Using the RTE as a guest
    Given guest comments are on
      And I am logged out
      And <commentable>
      And <commentable> with guest comments enabled
      And I view <commentable> with comments
    Then I should see "Rich Text"
    When I follow "Rich Text"
      And I fill in "comment[name]" with "guest"
      And I fill in "comment[email]" with "guest@example.org"
      And I send keys "cats" to Lexxy
      And I press "Comment"
    Then I should see "Comment created!"
      And I should see the text with tags "<p>cats</p>"

    Examples:
      | commentable |
      | the work "Generic Work" |
      | the admin post "Five Things" |

  # Scenario: Getting out of editor area with keyboard
