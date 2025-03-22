const fs = require('fs');

const topics = [
  'Web Development', 'React', 'Next.js', 'JavaScript', 'TypeScript', 'CSS',
  'Frontend', 'Backend', 'DevOps', 'AI/ML', 'Database', 'Security',
  'Performance', 'Testing', 'UI/UX', 'Mobile Development', 'Cloud Computing',
  'Machine Learning', 'Data Science', 'Blockchain', 'IoT', 'AR/VR'
];

const authors = [
  'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'David Brown',
  'Emily Davis', 'Robert Wilson', 'Lisa Anderson', 'James Taylor', 'Maria Garcia',
  'Thomas Lee', 'Jennifer White', 'William Clark', 'Patricia Martinez',
  'Michael Rodriguez', 'Linda Thompson', 'Joseph Moore', 'Margaret Lewis',
  'Daniel Walker', 'Sandra Hall'
];

const categories = [
  'Web Development', 'React', 'Next.js', 'JavaScript', 'TypeScript', 'CSS',
  'Frontend', 'Backend', 'DevOps', 'AI/ML'
];

function generateRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function generateRandomCategories() {
  const numCategories = Math.floor(Math.random() * 3) + 1;
  const shuffled = categories.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numCategories);
}

function generateRandomContent(topic) {
  const paragraphs = [
    `In this comprehensive guide, we'll explore ${topic} and its various applications in modern web development.`,
    `Understanding ${topic} is crucial for developers who want to stay ahead in the rapidly evolving tech landscape.`,
    `We'll dive deep into the best practices, common pitfalls, and advanced techniques related to ${topic}.`,
    `Whether you're a beginner or an experienced developer, this post will provide valuable insights into ${topic}.`,
    `Let's examine how ${topic} can improve your development workflow and enhance your projects.`
  ];
  
  return paragraphs.join(' ');
}

function generatePosts(count) {
  const posts = [];
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2024-12-31');

  for (let i = 1; i <= count; i++) {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];
    
    posts.push({
      id: i,
      title: `${topic}: A Comprehensive Guide`,
      content: generateRandomContent(topic),
      author: author,
      createdAt: generateRandomDate(startDate, endDate),
      categories: generateRandomCategories()
    });
  }

  return posts;
}

const posts = generatePosts(350);
const db = { posts };

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log('Generated 350 blog posts in db.json'); 