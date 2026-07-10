package at.amscrawler.backend.jobposting;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class JobPostingService {

    private final JobPostingRepository jobPostingRepository;

    public JobPostingService(JobPostingRepository jobPostingRepository) {
        this.jobPostingRepository = jobPostingRepository;
    }

    public List<JobPostingResponseDTO> getAllJobs() {
        return jobPostingRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public JobPostingResponseDTO createJob(JobPostingRequestDTO request) {
        JobPosting saved = jobPostingRepository.save(toEntity(request));
        return toResponse(saved);
    }

    // Replaces every stored posting with the current crawl in one transaction,
    // so readers never see a half-rebuilt table.
    @Transactional
    public void replaceAllJobs(List<JobPostingRequestDTO> jobs) {
        jobPostingRepository.deleteAll();
        jobPostingRepository.saveAll(jobs.stream().map(this::toEntity).toList());
    }

    private JobPosting toEntity(JobPostingRequestDTO request) {
        return new JobPosting(request.title(), request.company(), request.location(),
                request.description(), request.url(), request.lastUpdatedAt());
    }

    private JobPostingResponseDTO toResponse(JobPosting job) {
        return new JobPostingResponseDTO(job.getId(), job.getTitle(), job.getCompany(),
                job.getLocation(), job.getDescription(), job.getUrl(), job.getLastUpdatedAt());
    }
}
