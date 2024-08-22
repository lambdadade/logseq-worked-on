# [Logseq](https://logseq.com) done time plugin

This is a fork of the [logseq-done-time plugin](https://github.com/mjs/logseq-done-time)
Instead of setting a propery for completed tasks it sets a property everytime a task is in progress.
It can be used for creating reports for tasks beeing worked on in the past N days.

This is an early version which has to be polished in the next days.
Currently it sets the property "worked-on" with a value of the current date everytime the task state is changing.

## How to release

1. `yarn build`
2. Commit the changes.
3. `git push`
4. Make release in GitHub.
