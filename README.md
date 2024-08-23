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
  :keys date block ;#bind :find output to keys: the ?d variable to date and the block data to block
  :in $ ?start ?next
  :where
   [?b :block/properties-text-values ?textprop] ;#get plain text of the properties
   [?b :block/properties ?prop]
   [(get ?prop :worked-on) ?workedon] ;#get the due-by property
   [?b :block/refs ?j] ;#get the block references
   [?j :block/original-name ?journal] ;#get the page name of the reference
   [(contains? ?workedon ?journal)] ;#check that the reference is actually present in the property
   [?j :block/journal-day ?d] ;#get the date of the journal page
   [(<= ?start ?d ?next)] ;#check that the journal page is in range
;   [(get ?prop :priority) ?stat] ;#get the status property
 ]
 :breadcrumb-show? false
 :result-transform (fn [result] (sort-by ;#sort the result by the :date key through some functions
  (fn [r] (get-in r [:block/properties :date])) ;#use the binding from the map below
  (map ;#make a new map from the result set
    (fn [r]
      (update (:block r) :block/properties ;#we're going to update the values for the block attribute :block/properties
        (fn [u] (assoc u :date (get-in r [:date]) ) ) ;#putting the :date key/value pair from the results into the :block/properties attribute.
      ) 
    )
    result
  )
 ))
}
#+END_QUERY
```
```
```
## How to release

1. `yarn build`
2. Commit the changes.
3. `git push`
4. Make release in GitHub.
