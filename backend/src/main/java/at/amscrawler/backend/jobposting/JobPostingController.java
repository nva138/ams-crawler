package at.amscrawler.backend.jobposting;


import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public JobPostingResponseDTO createJobPosting(@RequestBody JobPostingRequestDTO jobPostingRequestDTO){
        return jobPostingService.createJob(jobPostingRequestDTO);
    }
}
