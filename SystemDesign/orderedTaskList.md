# Ordered Task List

口头design一个ordered task list的系统，有一个server和多个client。实现功能
  1. insert into the task list
  2. remove from the list
  3. move one task to a different place in the list，尽量即时。

要求简述一下API的形式，怎样handle不同用户之间operation的conflict。很多细节上的follow up，比如一个client在remove的同时另一个client在move同一个task怎么办。


## Step:
1. establish client to server connection
```
define server:
server could be as long as all the jobs/tasks created for an entire organization
or could be as small as stories inside one epic.
depends on the interface, the client connection should be different.
```
2. client pings server to keep connection alive, heatbeat
```javascript
POST/       login/ 
```
3. client sends a msg to server regarding a task operation, ie `add new task`. Each task should have a timestamp on when the job is generated. Note: requests are over HTTP/HTTPS, there should not be any packet loss case where server does not receive the msg.
```javascript
POST        tasks/           // for creating a new task
PUT         tasks/{id}       // updating task's content
DELETE      tasks/{id}       // removes a task

POST        transitions?taskId={id}&&targetStatus={id}
            // moving task from one status to another
PUT         tasks/{id}?targetUserId={id}
            // assign current task to another user
```
4. server receives msg, put task on a queue.
```javascript
// issue 1: handling operation conflict
if (q.includes(taskId)) { 
  // there's already another job for this task in the queue
  // operation this the new coming job should be forbidden, notify that client
  server.notify('client-id', 404, 'task has been modified by other user, try again');
  // could expand the business logic here to do more complication actions
  // such as, merge two requests. ie, changing task content while other user changing 
  // the assignee. (no conflict first)
}

// issue 2: optimization - max profit in job scheduling questions
// keep the msg content small
// increase the server thread, to be able to process multiple tasks at the same time

// issue 3: queue is full
// benchmark testing to see if this really becomes an issue?
// could be an issue with slow network
```
5. server queue processes the first task, once completed, broadcast a new msg to all live clients
```javascript
// Web Workers can broadcast messages
var bc = new BroadcastChannel('current channel');
bc.postMessage('update completed');
```
6. all live clients pull the updated tasks
```javascript
GET           tasks/
```
