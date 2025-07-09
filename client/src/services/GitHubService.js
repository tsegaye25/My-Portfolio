import axios from 'axios';

const GITHUB_USERNAME = 'tsegaye25'; // Replace with your GitHub username
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Fetches repositories from GitHub API
 * @returns {Promise<Array>} Array of formatted project objects
 */
export const fetchGitHubRepositories = async () => {
  try {
    // Check for cached data first
    const cachedProjects = localStorage.getItem('githubProjects');
    const cachedTimestamp = localStorage.getItem('githubProjectsTimestamp');
    
    if (cachedProjects && cachedTimestamp) {
      const now = new Date().getTime();
      const cacheTime = parseInt(cachedTimestamp);
      
      // If cache is still valid, use it
      if (now - cacheTime < CACHE_DURATION) {
        return JSON.parse(cachedProjects);
      }
    }
    
    // Fetch from GitHub API
    const response = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    );
    
    // Transform GitHub data to match our project structure
    const githubProjects = response.data.map(repo => {
      // Determine categories based on repo language
      const categories = [];
      
      // Add 'web' category for typical web technologies
      if (['JavaScript', 'TypeScript', 'HTML', 'CSS'].includes(repo.language)) {
        categories.push('web');
      }
      
      // Add 'api' category for backend technologies
      if (['Node', 'Express', 'Python', 'Java', 'PHP'].includes(repo.language)) {
        categories.push('api');
      }
      
      // Add 'mobile' category if repo name suggests mobile app
      if (repo.name.toLowerCase().includes('mobile') || 
          repo.name.toLowerCase().includes('android') || 
          repo.name.toLowerCase().includes('ios') || 
          repo.name.toLowerCase().includes('react-native')) {
        categories.push('mobile');
      }
      
      // Ensure at least one category
      if (categories.length === 0) {
        categories.push('web');
      }
      
      return {
        id: repo.id,
        title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
        description: repo.description || 'No description available',
        image: '/logo192.png', // Default image
        technologies: [repo.language].filter(Boolean),
        github: repo.html_url,
        live: repo.homepage || '',
        categories: categories,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated: repo.updated_at
      };
    });
    
    // Filter out forked repositories that don't have descriptions
    const filteredRepos = githubProjects.filter(project => 
      !(project.fork && !project.description)
    );
    
    // Sort by most recently updated
    filteredRepos.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    
    // Cache the projects in localStorage
    localStorage.setItem('githubProjects', JSON.stringify(filteredRepos));
    localStorage.setItem('githubProjectsTimestamp', new Date().getTime().toString());
    
    return filteredRepos;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw error;
  }
};

export default { fetchGitHubRepositories };
