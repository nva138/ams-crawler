package at.amscrawler.backend.jobposting;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobPostingController {

    private final JobPostingService jobPostingService;

    public JobPostingController(JobPostingService jobPostingService) {
        this.jobPostingService = jobPostingService;

    }

    @GetMapping
    public List<JobPostingResponseDTO> allJobs(){
        return jobPostingService.getAllJobs();
    }
}
