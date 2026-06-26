package at.amscrawler.backend.crawl;


import at.amscrawler.backend.jobposting.JobPostingRepository;
import at.amscrawler.backend.jobposting.JobPostingRequestDTO;
import at.amscrawler.backend.jobposting.JobPostingService;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;

@Service
public class CrawlService {

    private final ScraperProcessRunner scraperProcessRunner;
    private final JobPostingService jobPostingService;
    private final ObjectMapper objectMapper;
    private final JobPostingRepository jobPostingRepository;

    public CrawlService(ScraperProcessRunner scraperProcessRunner, JobPostingService jobPostingService, ObjectMapper objectMapper, JobPostingRepository jobPostingRepository) {
        this.scraperProcessRunner = scraperProcessRunner;
        this.jobPostingService = jobPostingService;
        this.objectMapper = objectMapper;
        this.jobPostingRepository = jobPostingRepository;

    }

    public void crawl() throws IOException, InterruptedException {


        String json = scraperProcessRunner.runScraper();


        JobPostingRequestDTO[] jobs = objectMapper.readValue(json, JobPostingRequestDTO[].class);


        jobPostingRepository.deleteAll();
        for(JobPostingRequestDTO job : jobs) {
            if(!jobPostingService.existsByUrl(job.url())){
            jobPostingService.createJob(job);}
        }

    }
}
