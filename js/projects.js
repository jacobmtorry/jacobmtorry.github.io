export const projectDetails = {
    p1: `
        <h3>Overview</h3>
        <p class="desc">
            This project focuses on the design and implementation of a Tomasulo-style out-of-order RISC-V processor to overcome
            the performance limitations of a traditional 5-stage in-order pipeline. By dynamically scheduling instructions based
            on operand readiness, the core is able to continue executing independent instructions while long-latency operations
            such as cache misses, multiplication, and division are still in flight.
        </p>

        <h3>Core Architecture</h3>
        <p class="desc">
            The processor implements register renaming and in-order retirement using a circular reorder buffer (ROB), ensuring
            precise architectural state while allowing out-of-order execution. Reservation stations track operand readiness for
            each functional unit, and execution results are broadcast on a common data bus (CDB) to wake dependent instructions.
            Together, these mechanisms eliminate WAR and WAW hazards while correctly handling RAW dependencies.
        </p>

        <h3>Memory System</h3>
        <p class="desc">
            Memory support was extended through the addition of a data cache, a dedicated memory functional unit, and a split
            load-store queue. Stores are maintained in program order, while loads are tracked independently and issued when safe
            using a store masking mechanism. This design removes structural serialization present in a combined LSQ while
            preserving correctness.
        </p>

        <h3>Control Flow</h3>
        <p class="desc">
            Branching support includes a dedicated branch functional unit and global flush logic to recover from mispredictions.
            Younger instructions following a mispredicted branch are safely evicted from all pipeline stages, restoring the
            processor to a precise state.
        </p>

        <h3>Advanced Performance Features</h3>
        <p class="desc">
            Several architectural enhancements were explored to improve performance, including a pipelined tournament branch
            predictor combining GShare and two-level local history components, an aggressive next-line instruction prefetcher,
            and fully parameterized instruction and data caches. These features enabled evaluation of tradeoffs between IPC,
            latency, power, and area across multiple configurations.
        </p>

        <h3>Verification & Results</h3>
        <p class="desc">
            Correctness was verified using Spike and RVFI-based monitoring, ensuring that instructions executed out of order
            while always committing in program order. Performance improvements were measured using benchmark-driven IPC and
            cache metrics, demonstrating the impact of architectural optimizations on overall throughput.
        </p>

        <p style="margin-top:14px;">
            <a class="btn" href="https://github.com/jacobmtorry/ECE411" target="_blank" rel="noreferrer">
                View Repo
            </a>
        </p>
    `,
    p2: `
        <h2>FPGA Pac-Man (HDMI)</h2>

        <p class="desc">
            Recreated the classic Pac-Man arcade game on FPGA using a custom HDMI graphics pipeline
            and a MicroBlaze-controlled game engine. The design combines RTL-based rendering with
            C-driven game logic, emphasizing precise timing, memory-mapped graphics control, and
            hardware–software integration.
        </p>

        <h3>Rendering & Display Pipeline</h3>
        <p class="desc">
            The game is rendered using a tile-based background stored in BRAM and sprite overlays
            for Pac-Man and the ghosts. The maze is represented as a 28×36 tilemap with 8×8 pixel
            tiles, enabling efficient reuse of tile codes for walls, pellets, text, and lives.
            Tile codes are fetched from BRAM and expanded into pixel data through a custom font ROM,
            adapted from prior HDMI text controller designs.
        </p>

        <h3>Sprites & Graphics Composition</h3>
        <p class="desc">
            Pac-Man and the ghosts are implemented as ROM-based sprites rendered on top of the
            tilemap with priority ordering. Sprite positions and orientations are updated via
            AXI4-Lite registers written by the game logic. Pac-Man supports directional sprites,
            while the ghosts use multi-bit color encoding to support state-dependent visuals such
            as scared mode.
        </p>

        <h3>Game Logic & Control</h3>
        <p class="desc">
            All gameplay logic runs in C on a MicroBlaze processor, including keyboard input
            handling, movement validation, pellet collection, scoring, life tracking, and level
            resets. Tile and sprite updates are performed through AXI reads and writes to BRAM,
            allowing real-time modification of the maze and score display.
        </p>

        <h3>Ghost Behavior</h3>
        <p class="desc">
            Each ghost is implemented using a shared data structure and state machine with unique
            movement behavior inspired by the original game. Ghosts transition through boxed,
            release, active, and scared states, and use a breadth-first search (BFS) algorithm to
            compute valid paths through the maze toward dynamic target locations.
        </p>

        <h3>System Integration</h3>
        <p class="desc">
            The project integrates USB keyboard input, AXI-based peripherals, BRAM-backed graphics
            memory, and an HDMI output pipeline within a unified FPGA system. The design highlights
            careful coordination between real-time rendering, memory access, and software-driven
            control.
        </p>

        <p style="margin-top:14px;">
            <a class="btn" href="https://github.com/jacobmtorry/Pacman" target="_blank" rel="noreferrer">
                View Repo
            </a>
            <a class="btn" href="https://www.youtube.com/watch?v=ORMuu2yWL28" target="_blank" rel="noreferrer">
                View Demo
            </a>
        </p>
    `,
    p3: `
        <h2>College Dashboard</h2>

        <p class="desc">
            A desktop productivity application designed to centralize academic workflows for
            college students. The dashboard brings together tasks, deadlines, and schedules into
            a single interface, reducing context switching between learning management systems,
            notes, and standalone to-do apps.
        </p>

        <h3>Design Goals</h3>
        <ul>
            <li>Provide a single, distraction-free hub for academic organization</li>
            <li>Emphasize clarity, speed, and low cognitive overhead</li>
            <li>Build a foundation that can scale into a real, distributable product</li>
        </ul>

        <h3>Implementation</h3>
        <p class="desc">
            The application is built using React for the user interface and packaged as a desktop
            application using Electron. The architecture is designed to support incremental
            feature expansion, including persistent storage, analytics, and future paid tiers.
        </p>

        <h3>Product Direction</h3>
        <p class="desc">
            The project is being developed in phases, starting with a free core feature set and
            expanding toward advanced organization and productivity tools. The long-term goal is
            to create a polished, sellable application rather than a short-lived prototype.
        </p>

        <p style="margin-top:14px;">
            <a class="btn" href="https://github.com/jacobmtorry/collegeDashboard" target="_blank" rel="noreferrer">
                View Repo
            </a>
            <a class="btn" href="https://jacobmtorry.github.io/collegeDashboard/" target="_blank" rel="noreferrer">
                View Demo
            </a>
        </p>
    `,
};
