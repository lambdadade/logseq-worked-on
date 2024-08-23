# [Logseq](https://logseq.com) done time plugin

This is a fork of the [logseq-done-time plugin](https://github.com/mjs/logseq-done-time)
Instead of setting a propery for completed tasks it sets a property everytime a task is in progress.
It can be used for creating reports for tasks beeing worked on in the past N days.

This is an early version which has to be polished in the next days.
Currently it sets the property "worked-on" with a value of the current date everytime the task state is changing.

## example query:
this is an example query to show all tasks with the "worked-on" property set on the last 7 days +1 
```
#+BEGIN_QUERY
{:title [:h3 "Worked on... (-7-1 days):"]
 :inputs [:-7d :+1d]
 :query [:find ?d (pull ?b [*])
  :keys date block
  :in $ ?start ?next
  :where
   [?b :block/properties-text-values ?textprop]
   [?b :block/properties ?prop]
   [(get ?prop :worked-on) ?workedon]
   [?b :block/refs ?j]
   [?j :block/original-name ?journal]
   [(contains? ?workedon ?journal)]
   [?j :block/journal-day ?d]
   [(<= ?start ?d ?next)]
;   [(get ?prop :priority) ?stat]
 ]
 :breadcrumb-show? false
 :result-transform (fn [result] (sort-by
  (fn [r] (get-in r [:block/properties :date]))
  (map
    (fn [r]
      (update (:block r) :block/properties
        (fn [u] (assoc u :date (get-in r [:date]) ) )
      ) 
    )
    result
  )
 ))
}
#+END_QUERY
```

## How to release

1. `yarn build`
2. Commit the changes.
3. `git push`
4. Make release in GitHub.
