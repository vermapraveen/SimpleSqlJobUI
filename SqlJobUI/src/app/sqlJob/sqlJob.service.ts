import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Job } from './job';
import { JobData } from './jobData';
import { JobDetails } from './jobDetails';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class JobService {
    // private allJobsUrl = 'api/jobData';
    //
    private jobUpdateSource = new Subject<number>();

    private allJobsUrl = 'http://localhost/Sqljob.Api/api/SqlJob/GetAllJobs';
    private stepDetails = 'http://localhost/Sqljob.Api/api/SqlJob/GetAll';

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    jobUpdate$ = this.jobUpdateSource.asObservable();

    jobSelectionChangedTo(jobId: number) {
        this.jobUpdateSource.next(jobId);
    }

    getAllJobs(): Promise<JobData> {
        return this.http.get(this.allJobsUrl)
            .toPromise()
            .then(response => {
                return response.json() as JobData;
            })
            .catch(this.handleError);
    }

    getJobSteps(id: number): Promise<JobDetails> {
        return this.http.get(this.stepDetails)
            .toPromise()
            .then(response => {
                // return response.json().data as JobDetails
                const allData = response.json() as JobDetails[];
                console.log("allData");
                console.log(allData);

                const selectedJobData = allData.find(x => x.id === id);

                return selectedJobData;

            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getAllJobsSlowly(): Promise<JobData> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getAllJobs()), 2000);
        });
    }

    getJob(id: number): Promise<Job> {
        const url = `${this.allJobsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Job)
            .catch(this.handleError);
    }

    update(job: Job): Promise<Job> {
        const url = `${this.allJobsUrl}/${job.id}`;
        return this.http
            .put(url, JSON.stringify(job), { headers: this.headers })
            .toPromise()
            .then(() => job)
            .catch(this.handleError);
    }

    create(name: string): Promise<Job> {
        return this.http
            .post(this.allJobsUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Job)
            .catch(this.handleError);
    }
}
