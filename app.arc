@app
habit-tracker-72b8

@aws
timeout 900


@http
/*
  method any
  src server

@static

@tables
user
  pk *String

habit
  pk *String  # userId
  sk **String # id

habitStatus
  pk *String  # userId
  sk **String # habitId

task
  pk *String  # userId
  sk **String # id

subtask
  pk *String  # userId
  sk **String # id

@tables-indexes
habitStatus
  pk *String  # userId
  statusDate **String
  name byUserIdDate

habitStatus
  pk *String  # userId
  statusMonth **String
  name byUserIdMonth

subtask
  pk *String  # userId
  taskId **String
  name byUserAndTaskId