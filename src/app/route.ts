import { IAgentRuntime } from "@ai16z/eliza";
import { TwitterClientInterface } from "../clients/twitter";
import { v4 as uuidv4 } from 'uuid';
import { ModelProviderName } from '@ai16z/eliza';

async function createExampleRuntime(): Promise<IAgentRuntime> {
    return {
        agentId: uuidv4(),
        serverUrl: 'http://localhost:3000',
        databaseAdapter: null,
        token: process.env.API_TOKEN || null,
        modelProvider: 'openai' as ModelProviderName,
        imageModelProvider: 'openai' as ModelProviderName,
        character: {
            name: "AI Character Name",
            bio: "Character biography and personality",
            knowledge: "Areas of expertise and knowledge",
            lore: "Character backstory and lore",
            topics: "Topics of interest",
            twitterUsername: process.env.TWITTER_USERNAME || "character_handle"
        },
        providers: [],
        actions: [],
        evaluators: [],
        plugins: [],
        messageManager: null,
        descriptionManager: null,
        documentsManager: null,
        knowledgeManager: null,
        loreManager: null,
        cacheManager: null,
        services: new Map(),
        
        initialize: async () => {},
        registerMemoryManager: () => {},
        getMemoryManager: () => null,
        getService: () => null,
        registerService: () => {},
        getSetting: () => null,
        getConversationLength: () => 0,
        processActions: async () => {},
        evaluate: async () => [],
        ensureParticipantExists: async () => {},
        ensureUserExists: async () => {},
        registerAction: () => {},
        ensureConnection: async () => {},
        ensureParticipantInRoom: async () => {},
        ensureRoomExists: async () => {},
        composeState: async () => ({}),
        updateRecentMessageState: async (state) => state,
    };
}

async function initializeTwitterCharacter(runtime: IAgentRuntime) {
    try {
        const twitterManager = await TwitterClientInterface.start(runtime);

        // At this point the Twitter client is running and will:
        // 1. Handle post creation via TwitterPostClient
        // 2. Handle interactions/replies via TwitterInteractionClient
        // 3. Use the character profile and knowledge defined in the runtime
        
        return twitterManager;
    } catch (error) {
        console.error("Failed to initialize Twitter character:", error);
        throw error;
    }
}

async function main() {
    try {
        const runtime = await createExampleRuntime();
        await runtime.initialize();
        const twitterManager = await initializeTwitterCharacter(runtime);
        console.log('Twitter character initialized successfully!');
        return twitterManager;
    } catch (error) {
        console.error('Failed to run Twitter character:', error);
        throw error;
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main().catch(console.error);
}

export { initializeTwitterCharacter, createExampleRuntime, main };
