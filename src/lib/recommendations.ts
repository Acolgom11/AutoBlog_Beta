import { Post } from '@/types/post';

export function getRelatedPosts(currentPost: Post, allPosts: Post[]): Post[] {
  const postsWithScore = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      let score = 0;
      
      // +3 points → same category
      if (post.category === currentPost.category) {
        score += 3;
      }
      
      // +2 points → per matching tag
      if (post.tags && currentPost.tags) {
        const currentTags = new Set(currentPost.tags.map(t => t.toLowerCase()));
        post.tags.forEach(tag => {
          if (currentTags.has(tag.toLowerCase())) {
            score += 2;
          }
        });
      }
      
      // +1 point → similar words in title
      const ignoreWords = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'de', 'en', 'a', 'para', 'con']);
      const currentTitleWords = new Set(
        currentPost.title.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !ignoreWords.has(w))
      );
      const postTitleWords = post.title.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !ignoreWords.has(w));
      
      const commonWords = postTitleWords.filter(word => currentTitleWords.has(word));
      score += commonWords.length * 1;

      return { post, score };
    });

  // Constraints:
  // - Do not show irrelevant posts (require score > 0)
  // - Limit to max 5 results
  // - Prioritize quality over quantity
  return postsWithScore
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(item => item.post);
}
