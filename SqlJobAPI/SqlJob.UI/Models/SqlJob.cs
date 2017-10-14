using System;
using System.Collections.Generic;

namespace SqlJob.UI.Models
{
    public class SqlJobData
    {
        public string ConnectionString { get; set; }
        public IEnumerable<ExecutingSqlJob> Jobs { get; set; }
    }

    public class ExecutingSqlJob
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public int RunningSinceHours { get; set; }
        public int ExecutingStepId { get; set; }
        public string ExecutingStepName { get; set; }        
    }

    public class SqlStepsData
    {
        public string ConnectionString { get; set; }
        public IEnumerable<SqlJobSteps> AllSteps { get; set; }
    }

    public class SqlJobSteps
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsJobEnabled { get; set; }
        public int StepId { get; set; }
        public string StepName { get; set; }
        public string StepType { get; set; }
        public string StepExecutable { get; set; }
        public string ExecuteOnDatabase { get; set; }
        public bool LastStatus { get; set; }
        public int LastRunDuration { get; set; }
        public int LastRunDate { get; set; }
        public int LastRunTime { get; set; }

    }
}