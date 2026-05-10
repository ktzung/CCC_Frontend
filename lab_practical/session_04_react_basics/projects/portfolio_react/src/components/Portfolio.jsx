import { useState } from 'react';
import { portfolioItems } from '../data/portfolio';

function Portfolio() {
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'web', 'mobile', 'design'];

  const filteredItems = filter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === filter);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <h2 className="section-title text-center">My Portfolio</h2>
        <p className="section-subtitle text-center">Recent projects I've worked on</p>

        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => handleFilterChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="portfolio-card">
              <div className="card-image">
                <img src={item.image} alt={item.title} />
                <div className="card-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.category}</p>
                </div>
              </div>
              <div className="card-body">
                <span className={`badge bg-${item.badgeColor}`}>{item.category}</span>
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <button className="btn btn-outline-primary">View Details</button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center text-muted">No projects found in this category.</p>
        )}
      </div>
    </section>
  );
}

export default Portfolio;