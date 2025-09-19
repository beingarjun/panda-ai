// Simple in-memory database for development
// In production, you would use a real database

type User = {
  id: number;
  email: string;
  password_hash?: string; // Optional for OAuth users
  name?: string;
  avatar_url?: string;
  provider?: string; // 'local', 'google', 'microsoft', 'apple'
  provider_id?: string;
  created_at: number;
};

type Run = {
  id: string;
  user_id: number;
  website: string;
  description: string;
  topics_csv: string;
  prompts_text: string;
  created_at: number;
};

type Competitor = {
  id: number;
  run_id: string;
  name: string;
  score: number;
  topical: number;
  schema: number;
  freshness: number;
};

type EngineResult = {
  id: number;
  run_id: string;
  engine: string;
  score: number;
};

type EngineSource = {
  id: number;
  engine_result_id: number;
  title: string;
  url: string;
};

class InMemoryDB {
  private users: User[] = [];
  private runs: Run[] = [];
  private competitors: Competitor[] = [];
  private engineResults: EngineResult[] = [];
  private engineSources: EngineSource[] = [];
  private nextId = 1;

  // Users
  createUser(email: string, passwordHash?: string, profile?: {
    name?: string;
    avatar_url?: string;
    provider?: string;
    provider_id?: string;
  }): number {
    const user: User = {
      id: this.nextId++,
      email,
      password_hash: passwordHash,
      name: profile?.name,
      avatar_url: profile?.avatar_url,
      provider: profile?.provider || 'local',
      provider_id: profile?.provider_id,
      created_at: Date.now()
    };
    this.users.push(user);
    return user.id;
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  findUserById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  findUserByProvider(provider: string, providerId: string): User | undefined {
    return this.users.find(u => u.provider === provider && u.provider_id === providerId);
  }

  // Runs
  createRun(runId: string, userId: number, payload: {
    website: string; description: string; topics_csv: string; prompts_text: string;
  }): void {
    const run: Run = {
      id: runId,
      user_id: userId,
      website: payload.website,
      description: payload.description,
      topics_csv: payload.topics_csv,
      prompts_text: payload.prompts_text,
      created_at: Date.now()
    };
    this.runs.push(run);
  }

  listRuns(userId: number): Run[] {
    return this.runs.filter(r => r.user_id === userId).sort((a, b) => b.created_at - a.created_at);
  }

  getRun(runId: string) {
    const run = this.runs.find(r => r.id === runId);
    const competitors = this.competitors.filter(c => c.run_id === runId).sort((a, b) => b.score - a.score);
    const engines = this.engineResults.filter(e => e.run_id === runId).map(e => {
      const sources = this.engineSources.filter(s => s.engine_result_id === e.id);
      return { engine: e.engine, score: e.score, sources };
    });
    return { run, competitors, engines };
  }

  // Competitors
  insertCompetitors(runId: string, competitors: Array<{
    name: string; score: number; topical: number; schema: number; freshness: number;
  }>): void {
    for (const comp of competitors) {
      this.competitors.push({
        id: this.nextId++,
        run_id: runId,
        name: comp.name,
        score: comp.score,
        topical: comp.topical,
        schema: comp.schema,
        freshness: comp.freshness
      });
    }
  }

  // Engine Results
  insertEngineResults(runId: string, engines: Array<{
    engine: string; score: number; sources: Array<{title: string; url: string}>;
  }>): void {
    for (const engine of engines) {
      const engineResult: EngineResult = {
        id: this.nextId++,
        run_id: runId,
        engine: engine.engine,
        score: engine.score
      };
      this.engineResults.push(engineResult);

      for (const source of engine.sources) {
        this.engineSources.push({
          id: this.nextId++,
          engine_result_id: engineResult.id,
          title: source.title,
          url: source.url
        });
      }
    }
  }
}

const db = new InMemoryDB();
export default db;
