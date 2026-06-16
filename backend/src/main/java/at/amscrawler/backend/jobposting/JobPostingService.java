package at.amscrawler.backend.jobposting;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobPostingService {

    private final JobPostingRepository jobPostingRepository;


    public JobPostingService(JobPostingRepository jobPostingRepository) {
        this.jobPostingRepository = jobPostingRepository;

    }

    public List<JobPostingResponseDTO> getAllJobs(){
        List<JobPosting> jobs = jobPostingRepository.findAll();
        return jobs.stream().map(job -> new JobPostingResponseDTO(job.getId(), job.getTitle(), job.getCompany(), job.getLocation(), job.getDescription(), job.getUrl())).toList();
    }

    public JobPostingResponseDTO createJob(JobPostingRequestDTO request) {
        JobPosting job = new JobPosting(request.title(), request.company(), request.location(), request.description(), request.url());
        JobPosting saved = jobPostingRepository.save(job);
        return new JobPostingResponseDTO(saved.getId(),  saved.getTitle(), saved.getCompany(), saved.getLocation(), saved.getDescription(), saved.getUrl());
    }
}
