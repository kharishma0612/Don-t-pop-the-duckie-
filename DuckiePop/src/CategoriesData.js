const categories = [
    {
      id: 1,
      name: 'Generative AI',
      imgSrc: '/icons/duck_genai.png',
      words: [
                "agent", "agi", "annotation", "asi", "bias",
                "bot", "chatbot", "chatgpt", "claude", "completion", "convAi", "dalle",
                "deepmind", "embedding", "fsl", "fineTune", "genAi", "gpt",
                "hallucination", "inference", "jasper", "llm", "llama", "mistral", "model",
                "midjourney", "nn", "openai", "overfit", "palm", "params", "perplex",
                "pretrain", "prompt", "rl", "ssl", "stableDiff",
                "supervised", "tune", "tokenize", "transformer", "unsupervised", "vector",
                "wordEmbed", "zsl", "bard", "dataAug",
                "gans", "hyperparams", "lossFunc", "ml",
                "multiModal", "ner", "nlp",
                "nas", "overfit", "perplex", "pretrain", "predictive",
                "probModel", "rnn", "resNet", "semantic",
                "sentiment", "seqModel", "speechRec", "styleTrans", "structData",
                "synData", "textGen", "t2i", "t2s", "tokenEmbed",
                "trainData", "transfer", "vae", "voiceClone",
                "weightParams", "zsl", "activeLearn", "attnMech",
                "backprop", "batchNorm", "beamSearch", "biasVarTradeoff", "bpe",
                "compLing", "contextWin", "cnn",
                "currLearn", "dl", "dataLabel", "dimReduce",
                "embedLayer", "explainAi", "featEng"
              ]

    },
    {
      id: 2,
      name: 'Web Development',
      imgSrc: '/icons/duck_web.png',
      words: [
              "HTML","CSS","JS","DOM","API","UI","UX","SEO","AJAX","JSON",
              "React","Vue","Angular","Svelte","Next","Node","Express","Django","Flask","Laravel",
              "Bootstrap","Tailwind","Material","SASS","LESS","jQuery","Typescript","ES6","GraphQL","REST",
              "HTTP","HTTPS","CDN","CORS","Cookie","Session","Token","OAuth","JWT",
              "Component","State","Props","Hook","Event","Listener","Callback","Promise","Async","Await",
              "Scope","Closure","Prototype","Loop","Condition","Variable","Function","Object","Array","String",
              "Boolean","Number","Null","Undefined","NaN","Frontend","Backend","Fullstack","Server","Client",
              "Database","MongoDB","PostgreSQL","MySQL","SQLite","Firebase","Prisma","ORM","MVC","SPA",
              "MPA","SSR","CSR","VirtualDOM","Reactivity","DataBinding","TwoWayBinding","ShadowDOM","Middleware","Router",
              "Request","Response","Header","Body","StatusCode","Authentication","Authorization","Hashing","Encryption","Firewall",
              "DNS","IP","SSL","TLS","Port","Socket","WebRTC","WebSocket","Graph","Cache",
              "LazyLoad","Minify","Optimize","Viewport","Flexbox","Grid","MediaQuery","Breakpoint","Accessibility","Aria",
              "Webpack","Vite","Babel","NPM","Yarn","Parcel","Gulp","ESLint","Prettier","Linting",
              "Testing","Debugging","Logging","Versioning","Refactoring","Deployment","Hosting","Cloud","DevOps"
              ]
    },
    {
      id: 3,
      name: 'Machine Learning',
      imgSrc: '/icons/duck_ml.png',
      words: [
              "AI","ML","algorithm","Model","Dataset","Neuron","Node","Layer","Bias","Weight","Loss","Train", "accuracy","Precision","Recall","F1","ROC","AUC","Confusion","Matrix","Overfit","Underfit","Cross","Validation","Split","Train",
              "Test","Data","Batch","Epoch","Step","Rule","Fit","Tune","Map","Graph", "perceptron", 
              "Supervised","Unsupervised","Deep","Neural","Network","Gradient","Optimizer","Activation","Regularize","Dropout",
              "Feature","Target","Label","Encode","Decode","Augment","Cluster","Embed","Vector","Matrix", "classification", "regression",
              "Tensor","Metric","Rank","Split","Sample","Mean","Error","MSE","RMSE","MAE",
              "Boost","Tree","Bayes","Kernel","SVM","KNN","Linear","Logistic","Lasso","Tuning",
              "Grid","Random","Bayesian","Outlier","Anomaly","Drift","Auto","Stream","Event","Frame",
              "Word2Vec","TFIDF","CNN","RNN","LSTM","GRU","GAN","BERT","GPT","XAI",
              "Cloud","Edge","Online","Offline","Pipeline","Deploy","Trainable","Explain","Fair","Ethic",
              "Zero","One","Sparse","Dense","Adaptive","Sampling","Ranking","FeatureMap","Noise","Trend",
              "Scaler","Cluster","Tree","Depth","RuleSet","Hyper","Norm","Param","Scope","Bound",
              "Shift","Mode","Phase","Curve","Pattern","Weighting","Fitting","Search","MeanShift","Fold"
              ]
    },
    {
      id: 4,
      name: 'Large System Design',
      imgSrc: '/icons/duck_lsd.png',
      words: [
        "Scalability","Availability","Reliability","LoadBalancer","Microservices","Monolithic","Caching","Partitioning","Replication","Sharding", "Database","Indexing","Consistency","Latency","Throughput","Failover","Middleware","APIGateway","RateLimiting","Concurrency", "Synchronization","Asynchronous","EventDriven","MessageQueue","WebSockets","CDN","Storage","NoSQL","SQL","CAPTheorem","EventualConsistency","StrongConsistency","LeaderElection","Distributed","LoadShedding","CircuitBreaker","Redundancy","Monitoring","Logging","Metrics","Observability","Autoscaling","Containerization","Kubernetes","Docker","ServiceDiscovery","Proxy","WebServer","DataCenter","EdgeComputing","CloudComputing","Serverless","HorizontalScaling","VerticalScaling","MessageBroker","APIThrottle","FaultTolerance","RetryMechanism","HeartbeatCheck","LeaderFollower","Hashing","BloomFilter","Quorum","DataPipeline","ETL","DataWarehouse","ConsistentHashing","RateLimiter","ReplicatedLog","DistributedCache","ReverseProxy","LoadTesting","StressTesting","FailFast","ChaosEngineering","LogAggregation","CircuitBreakerPattern","PublishSubscribe","MasterSlave","WorkerQueue","Elasticity","ConsensusAlgorithm","GossipProtocol","PeerToPeer","ResourcePooling","DataConsistency","ACID","BASE","ContentDelivery","PersistentStorage","Stateless","Stateful","HighAvailability","Idempotency","APIManagement","RollingUpdate","CanaryDeployment","ZeroDowntime","MultiTenant","ServiceMesh"
      ]
    }
  ];

  export default categories;