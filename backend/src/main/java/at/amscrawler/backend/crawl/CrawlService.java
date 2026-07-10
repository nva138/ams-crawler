package at.amscrawler.backend.crawl;


import at.amscrawler.backend.jobposting.JobPostingRequestDTO;
import at.amscrawler.backend.jobposting.JobPostingService;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;

@Service
public class CrawlService {

    private final ScraperProcessRunner scraperProcessRunner;
    private final JobPostingService jobPostingService;
    private final ObjectMapper objectMapper;

    public CrawlService(ScraperProcessRunner scraperProcessRunner, JobPostingService jobPostingService, ObjectMapper objectMapper) {
        this.scraperProcessRunner = scraperProcessRunner;
        this.jobPostingService = jobPostingService;
        this.objectMapper = objectMapper;
    }

    public void crawl() throws IOException, InterruptedException {
        String json = scraperProcessRunner.runScraper();
        List<JobPostingRequestDTO> jobs = List.of(objectMapper.readValue(json, JobPostingRequestDTO[].class));

        // Each crawl replaces the table with the current AMS listing: postings that
        // dropped off AMS disappear, the fresh crawl becomes the new source of truth.
        jobPostingService.replaceAllJobs(jobs);
    }
}
