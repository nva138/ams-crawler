package at.amscrawler.backend.jobposting;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
    List<JobPosting> findByCompany(String company);
    boolean existsByUrl(String url);
}
